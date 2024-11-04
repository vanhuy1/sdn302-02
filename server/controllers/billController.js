const Bill = require("../models/Bill");
const Booking = require("../models/Booking");
const CustomerService = require("../models/CustomerService");
const Room = require("../models/Room");
const User = require("../models/User")

const getBillsByUser = async (req, res) => {
    try {
        const username = req.user;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userID = user._id;

        // Fetch all bookings and then filter manually by userID
        const allBookings = await Booking.find({}).populate('roomID');
        const userBookings = allBookings.filter(booking => booking.userID.toString() === userID.toString());

        // Extract booking IDs from existing paid bills
        const existingPaidBills = await Bill.find({ username, isPaid: true }).select("bookingID");
        const billedBookingIDs = existingPaidBills.map(bill => bill.bookingID.toString());

        // Filter out only new bookings that haven't been billed
        const newBookings = userBookings.filter(booking => !billedBookingIDs.includes(booking._id.toString()));

        const bills = await Promise.all(newBookings.map(async (booking) => {
            // Check if a bill already exists for this booking
            const existingBill = await Bill.findOne({ bookingID: booking._id });

            if (!existingBill) {
                // Find related room and service details
                const roomDetails = await Promise.all(
                    booking.roomID.map(async (roomID) => {
                        const room = await Room.findById(roomID).populate("categoryRoomID", "roomCategoryName price");
                        return {
                            roomCategory: room.categoryRoomID.roomCategoryName,
                            roomNumber: room.roomNumber,
                            price: room.categoryRoomID.price
                        };
                    })
                );
                const services = await CustomerService.find({ userID: user._id.toString() }).populate("serviceID", "serviceName servicePrice");

                // Calculate total cost (rooms + services)
                const totalCost = roomDetails.reduce((acc, room) => acc + room.price, 0) +
                                  services.reduce((acc, service) => acc + service.servicePrice, 0);

                // Create a new bill with the calculated information
                const newBill = new Bill({
                    bookingID: booking._id,
                    customerName: user.name,
                    phoneNumber: user.phoneNumber,
                    roomDetails,
                    services: services.map(service => ({
                        serviceName: service.serviceID.serviceName,
                        servicePrice: service.servicePrice
                    })),
                    paymentMethod: 'Credit Card',
                    totalCost,
                    arriveDate: booking.startDate,
                    leaveDate: booking.endDate,
                    isPaid: false,
                    username
                });

                return await newBill.save();
            }

            return existingBill;
        }));

        res.status(200).json(bills);
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

const deleteBill = async (req, res) => {
    try {
        const bill = await Bill.findByIdAndDelete(req.params.billId)

        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }

        res.status(204).json({message: "Bill deleted successfully!"});
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    getBillsByUser,
    getBillById,
    createBill,
    updateBill,
    deleteBill
};
