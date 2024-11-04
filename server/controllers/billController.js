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

        const bills = await Bill.find({ username });

        // If no bills found
        if (!bills.length) {
            return res.status(200).json([]);
        }

        const populatedBills = await Promise.all(bills.map(async (bill) => {
            const booking = await Booking.findById(bill.bookingID)
                .populate({
                    path: 'roomID',
                    populate: { path: 'categoryRoomID', select: 'roomCategoryName price' }
                })
                .populate('services');

            return {
                ...bill._doc,
                bookingDetails: {
                    arriveDate: booking.startDate,
                    leaveDate: booking.endDate,
                    roomDetails: booking.roomID.map(room => ({
                        roomCategory: room.categoryRoomID.roomCategoryName,
                        roomNumber: room.roomNumber,
                        price: room.categoryRoomID.price,
                    })),
                    services: await Promise.all(
                        booking.services.map(async (serviceID) => {
                            const service = await ServiceItem.findById(serviceID).select("itemName cost");
                            return {
                                serviceName: service.itemName,
                                servicePrice: service.cost,
                            };
                        })
                    ),
                },
            };
        }));

        res.status(200).json(populatedBills);
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
