const Bill = require("../models/Bill");
const Booking = require("../models/Booking");
const ServiceItem = require("../models/ServiceItem");
const User = require("../models/User");

const getBillsByUser = async (req, res) => {
  try {
      const username = req.user;
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      const userID = user._id;

      // Fetch all bookings
      const allBookings = await Booking.find({})
          .populate({
              path: 'roomID',
              populate: { path: 'categoryRoomID', select: 'roomCategoryName price' }
          })
          .populate('services');

      // Filter bookings to only include those for the current user
      const userBookings = allBookings.filter(
          (booking) => booking.userID.toString() === userID.toString()
      );

      // Fetch all bills associated with the user, regardless of payment status
      const allBills = await Bill.find({ username });

      // Create new bills for any user bookings that don't have a corresponding bill
      const billedBookingIDs = new Set(allBills.map(bill => bill.bookingID.toString()));

      const newBills = await Promise.all(
          userBookings.map(async (booking) => {
              // Skip if this booking has already been billed
              if (billedBookingIDs.has(booking._id.toString())) {
                  return null;
              }

              // Find related room details
              const roomDetails = booking.roomID.map(room => ({
                  roomCategory: room.categoryRoomID.roomCategoryName,
                  roomNumber: room.roomNumber,
                  price: room.categoryRoomID.price,
              }));

              // Check if roomDetails is valid
              if (roomDetails.some(room => !room.roomCategory || !room.price)) {
                  console.error("Invalid room details", roomDetails);
                  return null; // Skip this booking due to invalid room details
              }

              // Extract service details
              const services = await Promise.all(
                  booking.services.map(async (serviceID) => {
                      const service = await ServiceItem.findById(serviceID).select("itemName cost");
                      return {
                          serviceName: service.itemName,
                          servicePrice: service.cost
                      };
                  })
              );

              // Check if services are valid
              if (services.some(service => !service.servicePrice)) {
                  console.error("Invalid service details", services);
                  return null; // Skip this booking due to invalid service details
              }

              // Calculate total cost (rooms + services)
              const totalCost =
                  roomDetails.reduce((acc, room) => acc + room.price, 0) +
                  services.reduce((acc, service) => acc + service.servicePrice, 0);

              // Check for NaN totalCost
              if (isNaN(totalCost)) {
                  console.error("Total cost calculation resulted in NaN", { roomDetails, services });
                  return null; // Skip this booking due to invalid total cost
              }

              // Create a new bill with the calculated information
              const newBill = new Bill({
                  bookingID: booking._id,
                  customerName: user.name,
                  phoneNumber: user.phoneNumber,
                  roomDetails,
                  services,
                  paymentMethod: "Credit Card",
                  totalCost,
                  arriveDate: booking.startDate,
                  leaveDate: booking.endDate,
                  isPaid: false,
                  username,
              });

              return await newBill.save(); // Save the newly created bill
          })
      );

      // Filter out any null values from the new bills array
      const filteredNewBills = newBills.filter(bill => bill !== null);

      // Combine all existing bills with newly created bills
      const allUserBills = [...allBills, ...filteredNewBills];

      res.status(200).json(allUserBills);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.status(200).json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBill = async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    const savedBill = await newBill.save();
    res.status(201).json(savedBill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBill = async (req, res) => {
  try {
    const updateBill = await Bill.findByIdAndUpdate(
      req.params.billId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updateBill) {
      return res.status(404).json({ error: "Bill updated unsuccessfully!" });
    }

    res.status(204).json(updateBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateBillStatus = async (req, res) => {
    const { isPaid } = req.body;

    if (typeof isPaid !== 'boolean') {
        return res.status(400).json({ message: "Invalid payment status" });
    }

    try {
        const updatedBill = await Bill.findByIdAndUpdate(
            req.params.billId,
            { isPaid },
            { new: true, runValidators: true }
        );

        if (!updatedBill) {
            return res.status(404).json({ message: "Bill not found" });
        }

        res.status(200).json(updatedBill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.billId);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(204).json({ message: "Bill deleted successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getBillsByUser,
  getBillById,
  createBill,
  updateBill,
  updateBillStatus,
  deleteBill,
};
