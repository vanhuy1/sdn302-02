const User = require('../models/User');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const RoomCategory = require('../models/RoomCategory');
const moment = require('moment');


const bookingRoom = async (req, res) => {
    try {
        const { username, categoryRoomId, startDate, endDate, amountBook } = req.body;
        let customerID;

        // Check input
        console.log(username);
        console.log(categoryRoomId);
        console.log(startDate);
        console.log(endDate);
        console.log(amountBook);

        // Find user by username and assign customerID
        const user = await User.findOne({ username: username });
        customerID = user ? user._id : null;

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

        const room = await RoomCategory.findById(categoryRoom);
        if (!room) {
            return res.status(403).json({ message: 'Room not found' });
        }

        const conflictingBookings = await Booking.find({
            categoryRoom,
            $or: [
                { startDate: { $lt: moment(endDate).toDate() }, endDate: { $gt: moment(startDate).toDate() } }
            ]
        }).distinct('roomID');

        const availableRooms = await Room.aggregate([
            { $match: { categoryRoomID: categoryRoom, status: { $in: ['E'] } } }
        ]);

        const filteredRooms = availableRooms.filter(room => {
            return !(room.status === 'R' && conflictingBookings.includes(room._id.toString()));
        });

        const availableRoomIDs = filteredRooms.map(room => room._id);

        if (availableRoomIDs.length === 0) {
            return res.status(404).json({ message: 'No available rooms for the selected period' });
        }

        console.log("Available roomIDs: ", availableRoomIDs);

        const pickRoom = availableRoomIDs[0];

        // Save booking
        const booking = new Booking({
            customerID,
            roomID: [pickRoom],
            startDate,
            endDate,
            amountBook
        });
        await booking.save();
        res.status(201).json(booking);

        const changeRoomStatus = await Room.findByIdAndUpdate(
            pickRoom,
            { status: 'R' },
            { new: true }
        );
        if (changeRoomStatus) {
            console.log('Room status updated:', changeRoomStatus);
        } else {
            console.log('Room not found or update failed');
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



// View all bookings with room names
const viewBookingRoom = async (req, res) => {
    try {
        // Find user by username and assign customerID
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const customerID = user._id;

        // Find all bookings for the customer
        const bookings = await Booking.find({ customerID });

        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user' });
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
            RoomCategory.findById(check)
        ]);

        if (!bookingChange || !room) {
            return res.status(402).json({ message: 'Booking or room not found' });
        }

        const conflictingBookings = await Booking.find({
            categoryRoom: check,
            $or: [
                { startDate: { $lt: moment(endDate).toDate() }, endDate: { $gt: moment(startDate).toDate() } }
            ]
        }).distinct('roomID');

        const availableRooms = await Room.aggregate([
            { $match: { categoryRoomID: check, status: { $in: ['E'] } } }
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
