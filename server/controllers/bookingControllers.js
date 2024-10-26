const User = require('../models/User');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const RoomCategory = require('../models/RoomCategory');
const moment = require('moment');
const mongoose = require('mongoose');

const bookingRoom = async (req, res) => {
    try {
        const { username, categoryRoomId, startDate, endDate, amountBook } = req.body;
        let customerID;

        // Log input
        console.log({ username, categoryRoomId, startDate, endDate, amountBook });

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        customerID = user._id;

        // Input validation
        if (!categoryRoomId || !startDate || !endDate || !amountBook) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (moment(startDate).isBefore(moment(), 'day')) {
            return res.status(401).json({ message: 'Start date must be today or later' });
        }

        if (moment(endDate).isBefore(moment(startDate), 'day')) {
            return res.status(402).json({ message: 'End date must be after start date' });
        }

        const categoryRoom = categoryRoomId[0];

        // Find room category
        const roomCategory = await RoomCategory.findById(categoryRoom);
        if (!roomCategory) {
            return res.status(403).json({ message: 'Room category not found' });
        }

        // Find conflicting bookings
        const conflictingBookings = await Booking.find({
            $or: [
                { startDate: { $lt: moment(endDate).toDate() }, endDate: { $gt: moment(startDate).toDate() } }
            ]
        }).distinct('roomID');
        console.log(conflictingBookings)
        // Find available rooms in the category that are not conflicting
        const availableRooms = await Room.aggregate([
            {
                $match: {
                    categoryRoomID: new mongoose.Types.ObjectId(categoryRoom),
                    status: 'E' // Available rooms with status 'E'
                }
            }
        ]);

        const filteredRooms = availableRooms.filter(room => {
            return !conflictingBookings.includes(room._id.toString());
        });

        const availableRoomIDs = filteredRooms.map(room => room._id);

        if (availableRoomIDs.length === 0) {
            return res.status(404).json({ message: 'No available rooms for the selected period' });
        }

        console.log("Available roomIDs: ", availableRoomIDs);

        const pickRoom = availableRoomIDs[0];

        // Save booking
        const booking = new Booking({
            userID: customerID,
            roomID: [pickRoom],
            startDate,
            endDate,
            amountBook
        });

        await booking.save();

        // Update room status
        const changeRoomStatus = await Room.findByIdAndUpdate(
            pickRoom,
            { status: 'R' }, // Mark as reserved
            { new: true }
        );

        if (!changeRoomStatus) {
            return res.status(500).json({ message: 'Failed to update room status' });
        }

        console.log('Room status updated:', changeRoomStatus);
        res.status(201).json(booking);

    } catch (error) {
        console.error("Error booking room:", error);
        res.status(500).json({ message: error.message });
    }
};



// View all bookings with room names
const viewBookingRoom = async (req, res) => {
    try {
        console.log(req.params.username)
        // Find user by username and assign customerID
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const customerID = user.id;

        // Find all bookings for the customer
        const bookings = await Booking.find({ userID: customerID });

        if (bookings.length === 0) {
            return res.status(402).json({ message: 'No bookings found for this user' });
        }

        // Loop through bookings and get room name for each booking
        const bookingDetails = await Promise.all(bookings.map(async (booking) => {
            const room = await Room.findById(booking.roomID).select('categoryRoomID');
            const roomCategory = room ? await RoomCategory.findById(room.categoryRoomID).select('roomCategoryName') : null;
            const roomName = roomCategory ? roomCategory.roomCategoryName : 'Unknown';

            return {
                ...booking._doc,
                roomName,
            };
        }));

        res.status(200).json(bookingDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const viewBookingById = async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.params.bookingID });
        console.log(booking)
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Edit booking room
const editBookingRoom = async (req, res) => {
    try {
        const { categoryRoomId, startDate, endDate, amountBook } = req.body;
        console.log(categoryRoomId);
        console.log(startDate);
        console.log(endDate);
        console.log(amountBook);
        if (![categoryRoomId, startDate, endDate, amountBook].every(Boolean)) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const today = moment();
        if (moment(startDate).isBefore(today, 'day') || moment(endDate).isBefore(startDate, 'day')) {
            return res.status(401).json({ message: 'Invalid date range' });
        }
        const check = categoryRoomId[0];
        console.log(check)
        const [bookingChange, room] = await Promise.all([
            Booking.findOne({ _id: req.params.bookingID }),
            RoomCategory.findById(new mongoose.Types.ObjectId(check))
        ]);

        if (!bookingChange || !room) {
            return res.status(402).json({ message: 'Booking or room not found' });
        }

        const conflictingBookings = await Booking.find({
            categoryRoom: new mongoose.Types.ObjectId(check),
            $or: [
                { startDate: { $lt: moment(endDate).toDate() }, endDate: { $gt: moment(startDate).toDate() } }
            ]
        }).distinct('roomID');

        const availableRooms = await Room.aggregate([
            {
                $match: {
                    categoryRoomID: new mongoose.Types.ObjectId(check),
                    status: { $in: ['E'] }
                }
            }
        ]);
        if (availableRooms.length === 0) {
            return res.status(403).json({ message: 'No available rooms for the selected period' });
        }

        const pickRoom = availableRooms[0]._id;
        const changeRoomStatus = await Room.findByIdAndUpdate(
            pickRoom,
            { status: 'R' },
            { new: true }
        );

        const changeRoomStatusOld = await Room.findByIdAndUpdate(
            bookingChange.roomID,
            { status: 'E' },
            { new: true }
        );

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.bookingID,
            { startDate, endDate, amountBook, roomID: pickRoom },
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        console.log("Update: ", updatedBooking)
        res.status(201).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Delete a booking
const deleteBooking = async (req, res) => {
    try {
        // Find the booking to delete
        const booking = await Booking.findById(req.params.bookingID);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Update the room status to 'E' (Empty) if the room exists
        const room = await Room.findByIdAndUpdate(
            booking.roomID,
            { status: 'E' },
            { new: true }
        );

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Delete the booking after updating the room status
        await Booking.findByIdAndDelete(req.params.bookingID);

        // Respond with success and the deleted booking details
        res.status(200).json({ message: 'Booking successfully deleted', booking });

    } catch (error) {
        // Handle any errors and respond with 500 status code
        res.status(500).json({ message: error.message });
    }
};


module.exports = { bookingRoom, viewBookingRoom, editBookingRoom, viewBookingById, deleteBooking };
