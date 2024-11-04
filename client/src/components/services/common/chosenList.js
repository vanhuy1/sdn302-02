import React, { useState, useEffect } from 'react';
import { Button, Card, ListGroup, Alert, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import { fetchUserBookings, selectAllBookings } from '../../../features/booking/BookingSlice';
import { useNavigate } from 'react-router-dom';

const ChosenList = ({ chosenServices, onRequestService }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const dispatch = useDispatch();
    const { username } = useAuth();
    const navigate = useNavigate();

    const categorizedServices = chosenServices.reduce((acc, item) => {
        if (!acc[item.serviceId]) {
            acc[item.serviceId] = {
                serviceName: item.serviceName,
                items: []
            };
        }
        acc[item.serviceId].items.push(item);
        return acc;
    }, {});

    const totalCost = chosenServices.reduce((total, item) => total + item.cost, 0);

    const userBookings = useSelector(selectAllBookings);
    const { loading, error } = useSelector((state) => state.booking);

    useEffect(() => {
        if (username) {
            dispatch(fetchUserBookings(username));
        }
    }, [dispatch, username]);

    const handleRequestService = () => {
        setShowModal(true);
    };

    const handleSelectBooking = (booking) => {
        setSelectedBooking(booking);
        setShowModal(false);
        onRequestService(booking); // Pass the selected booking ID to the request service handler
    };

    return (
        <>
            <Card className="p-4">
                <Card.Header as="h3">Chosen Service Items</Card.Header>
                {Object.keys(categorizedServices).length > 0 ? (
                    Object.entries(categorizedServices).map(([serviceId, service]) => (
                        <Card key={serviceId} className="mb-3">
                            <Card.Header as="h4">{service.serviceName}</Card.Header>
                            <ListGroup variant="flush">
                                {service.items.map(item => (
                                    <ListGroup.Item key={item._id}>
                                        {item.itemName} - ${item.cost}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card>
                    ))
                ) : (
                    <Alert variant="info">No service items chosen yet.</Alert>
                )}
                <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="font-weight-bold" style={{ fontSize: '1.2em' }}>Total: ${totalCost}</div>
                    <Button
                        variant="primary"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleRequestService}
                        style={{
                            backgroundColor: isHovered ? '#0056b3' : '#007bff',
                            transition: 'background-color 0.3s',
                        }}
                    >
                        Request Service
                    </Button>
                </div>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading && <p>Loading bookings...</p>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <ListGroup>
                        {userBookings.map(booking => (
                            <ListGroup.Item 
                                key={booking.bookingId} 
                                action 
                                onClick={() => handleSelectBooking(booking)}
                            >
                                {booking.roomName} - {booking.startDate}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ChosenList;
