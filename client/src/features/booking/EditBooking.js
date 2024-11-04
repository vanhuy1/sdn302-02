import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateBooking, fetchCurrentBookings, selectAllBookings } from './BookingSlice';
import { Form, Button, Container, Nav, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ViewRoomCategory } from '../room/RoomSlice';

const EditBooking = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bookings = useSelector(selectAllBookings);
    const bookingToEdit = bookings.find((booking) => booking._id === id);
    const [categoryRoomId, setCategoryRoomId] = useState('');
    const [startDate, setStartDate] = useState(bookingToEdit?.startDate || '');
    const [endDate, setEndDate] = useState(bookingToEdit?.endDate || '');
    const [amountBook, setAmountBook] = useState(bookingToEdit?.amountBook || 1);
    const { loading, error } = useSelector((state) => state.booking);
    const roomCategories = useSelector((state) => state.room.roomCategories);

    const handleRoomChange = (e) => {
        const value = e.target.value;
        if (categoryRoomId.includes(value)) {
            setCategoryRoomId(categoryRoomId.filter((room) => room !== value));
        } else {
            setCategoryRoomId([...categoryRoomId, value]);
        }
    };

    useEffect(() => {
        dispatch(ViewRoomCategory());
        if (!bookingToEdit) {
            dispatch(fetchCurrentBookings);
        }
    }, [dispatch, bookingToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
            categoryRoomId,
            startDate,
            endDate,
            amountBook
        };

        dispatch(updateBooking({ id, updatedData }))
            .then((action) => {
                // Kiểm tra nếu action là fulfilled
                if (updateBooking.fulfilled.match(action)) {
                    navigate('/dash/viewroom');

                } else {
                    console.error('Failed to fetch booking details');
                }
            });
    };

    return (

        <Container className="my-4">
            {/* Navigate */}
            <Nav className="mb-4 justify-content-center" >
                <Nav.Item className="mx-4">
                    <Nav.Link
                        as={Link}
                        to="/dash/booking"
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
                        to="/dash/viewroom"
                        className="text-white fw-bold bg-success rounded p-2"
                        style={{ transition: 'background-color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#20c997'}
                    >
                        View Your Booking
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <h2 className="mb-1 text-center">Booking Room</h2>

            {/* Form */}
            <Form className="p-4 shadow-sm bg-light rounded" onSubmit={handleSubmit}>
                <Form.Group controlId="formRoomType" className="mb-4">
                    <Form.Label className="fw-bold">Room Categories</Form.Label>
                    <Row>
                        {loading ? (
                            <p>Loading room categories...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : (
                            roomCategories.map((room) => (
                                <Col md={4} key={room._id}>
                                    <Form.Check
                                        type="checkbox"
                                        label={room.roomCategoryName}
                                        value={room._id}
                                        onChange={handleRoomChange}
                                        className="my-2"
                                    />
                                    <Image src="https://th.bing.com/th/id/OIP.AZ1nXW2LL-KdxgqX62gqUQHaE8?rs=1&pid=ImgDetMain" rounded className="mt-2" style={{ width: '200px', height: '200px' }} />
                                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#2E86C1', margin: '10px 0' }}>
                                        Price: <span style={{ color: '#27AE60' }}>${room.price.toLocaleString()}</span>
                                    </p>
                                </Col>
                            ))
                        )}
                    </Row>
                </Form.Group>

                <Row className="mb-4">
                    <Form.Group as={Col} controlId="formStartDate" md={6}>
                        <Form.Label className="fw-bold">Start Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={{ maxWidth: '250px' }}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formEndDate" md={6}>
                        <Form.Label className="fw-bold">End Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={{ maxWidth: '250px' }}
                        />
                    </Form.Group>
                </Row>

                <Form.Group as={Row} controlId="formRoomCount" className="mb-4">
                    <Form.Label column sm={2} className="fw-bold">
                        Amount of Room
                    </Form.Label>
                    <Col sm={4}>
                        <Form.Control
                            type="number"
                            value={amountBook}
                            onChange={(e) => setAmountBook(e.target.value)}
                            min="1"
                            style={{ maxWidth: '150px' }}
                        />
                    </Col>
                </Form.Group>

                <Row className="mt-4">
                    <Col className="text-center">
                        <Button variant="primary" type="submit" className="me-2">
                            OK
                        </Button>
                        <Button variant="secondary">
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
            {/* Loading and Error Handling */}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        </Container>
    );
};

export default EditBooking;
