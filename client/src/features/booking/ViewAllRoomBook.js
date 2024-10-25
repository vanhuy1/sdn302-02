import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, Container, Nav, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/landing-page/sidebar';
import useAuth from '../../hooks/useAuth';
import { fetchUserBookings, selectAllBookings, deleteBooking } from './BookingSlice'; // Update to match your new thunk

const ViewAllRoomBook = () => {
    const dispatch = useDispatch();
    const { username } = useAuth();
    const navigate = useNavigate();
    // Fetch all bookings for the current user
    const userBookings = useSelector(selectAllBookings);
    const { loading, error } = useSelector((state) => state.booking);

    useEffect(() => {
        if (username) {
            dispatch(fetchUserBookings(username));
        }

    }, [dispatch, username]);

    const handleDelete = (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            dispatch(deleteBooking(bookingId)).then(() => {
                navigate('/viewroom');
            });
        }
    };

    return (
        <>
                <Row>
                    <Col md={2} className="bg-light">
                        <Sidebar />
                    </Col>
                    <Col md={10}>
                        <Container className="my-4">
                            {/* Navigate */}
                            <Nav className="mb-4 justify-content-center">
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
                            </Nav>

                            <h2 className="text-center mb-4">Your Booked Rooms</h2>

                            {/* Loading and Error Messages */}
                            {loading && <p>Loading your bookings...</p>}
                            {error && <p>Error fetching bookings: {error}</p>}

                            {/* Table to display bookings */}
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Room Type</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Amount</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userBookings?.length > 0 ? (
                                        userBookings.map((booking, index) => (
                                            <tr key={booking._id}>
                                                <td>{index + 1}</td>
                                                <td>{booking.roomName}</td>
                                                <td>{new Date(booking.startDate).toLocaleString()}</td>
                                                <td>{new Date(booking.endDate).toLocaleString()}</td>
                                                <td>{booking.amountBook}</td>
                                                <td>
                                                    <Button
                                                        as={Link}
                                                        to={`/edit-booking/${booking._id}`}
                                                        className="text-white fw-bold bg-warning rounded p-2 mx-4"
                                                        style={{ transition: 'background-color 0.3s' }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffc107'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffd600'}
                                                    >
                                                        Change Room
                                                    </Button>

                                                    <Button
                                                        onClick={() => handleDelete(booking._id)}
                                                        className="text-white fw-bold bg-danger rounded p-2 mx-4"
                                                        style={{ transition: 'background-color 0.3s' }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                                                    >
                                                        Cancel Booking
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">No bookings found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Container>
                    </Col>
                </Row>
        </>
    );
};

export default ViewAllRoomBook;
