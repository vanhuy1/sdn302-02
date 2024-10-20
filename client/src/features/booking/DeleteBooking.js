import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteBooking, fetchUserBookings, selectAllBookings } from './BookingSlice';
import { Button, Container, Alert, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DeleteBooking = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bookings = useSelector(selectAllBookings);
    const bookingToDelete = bookings.find((booking) => booking.id === id);

    const handleDelete = () => {
        dispatch(deleteBooking(id)).then(() => {
            navigate('/view-booking'); // Điều hướng sau khi xóa
        });
    };

    return (
        <Container className="my-4">
            {/* Navigate */}
            <Nav className="mb-4 justify-content-center" >
                <Nav.Item className="mx-4">
                    <Nav.Link
                        as={Link}
                        to="/booking"
                        className="text-white fw-bold bg-primary rounded p-2"
                        style={{ transition: 'background-color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                    >
                        Booking Room
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="mx-4">
                    <Nav.Link
                        as={Link}
                        to="/viewroom"
                        className="text-white fw-bold bg-success rounded p-2"
                        style={{ transition: 'background-color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#20c997'}
                    >
                        View Your Booking
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="mx-4">
                    <Nav.Link
                        as={Link}
                        to="/edit-booking"
                        className="text-white fw-bold bg-warning rounded p-2"
                        style={{ transition: 'background-color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffc107'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffd600'}
                    >
                        Change Room
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="mx-4">
                    <Nav.Link
                        as={Link}
                        to="/cancel-booking"
                        className="text-white fw-bold bg-danger rounded p-2"
                        style={{ transition: 'background-color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                    >
                        Cancel Booking
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <h2 className="text-center">Delete Booking</h2>
            {bookingToDelete ? (
                <>
                    <Alert variant="danger">
                        Are you sure you want to delete the booking for <strong>{bookingToDelete.roomType}</strong>?
                    </Alert>
                    <Button variant="danger" onClick={handleDelete}>
                        Confirm Delete
                    </Button>
                </>
            ) : (
                <Alert variant="warning">Booking not found.</Alert>
            )}
        </Container>
    );
};

export default DeleteBooking;
