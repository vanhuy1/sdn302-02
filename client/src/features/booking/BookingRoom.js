import React, { useState } from 'react';
import { Button, Form, Row, Col, Container, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/landing-page/header';
import Footer from '../../components/landing-page/footer';
import Sidebar from '../../components/landing-page/sidebar';

const Booking = () => {
    const [roomId, setRoomId] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [amountBook, setAmountBook] = useState(1);

    const handleRoomChange = (e) => {
        const value = e.target.value;
        if (roomId.includes(value)) {
            setRoomId(roomId.filter((room) => room !== value));
        } else {
            setRoomId([...roomId, value]);
        }
    };

    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={2} className="bg-light">
                        <Sidebar />
                    </Col>

                    <Col md={10}>
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
                                        to="/view-booking"
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

                            <h2 className="mb-1 text-center">Booking Room</h2>

                            {/* Form */}
                            <Form className="p-4 shadow-sm bg-light rounded">
                                <Form.Group controlId="formRoomType" className="mb-4">
                                    <Form.Label className="fw-bold">Room Categories</Form.Label>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Check
                                                type="checkbox"
                                                label="Classic Room"
                                                value="classic"
                                                onChange={handleRoomChange}
                                                className="my-2"
                                            />
                                            <Image src="https://th.bing.com/th/id/OIP.AZ1nXW2LL-KdxgqX62gqUQHaE8?rs=1&pid=ImgDetMain" rounded className="mt-2" style={{ width: '200px', height: '200px' }} />
                                        </Col>
                                        <Col md={4}>
                                            <Form.Check
                                                type="checkbox"
                                                label="Chill Room"
                                                value="chill"
                                                onChange={handleRoomChange}
                                                className="my-2"
                                            />
                                            <Image src="https://th.bing.com/th/id/OIP.AZ1nXW2LL-KdxgqX62gqUQHaE8?rs=1&pid=ImgDetMain" rounded className="mt-2" style={{ width: '200px', height: '200px' }} />
                                        </Col>
                                        <Col md={4}>
                                            <Form.Check
                                                type="checkbox"
                                                label="Luxury Room"
                                                value="luxury"
                                                onChange={handleRoomChange}
                                                className="my-2"
                                            />
                                            <Image src="https://th.bing.com/th/id/OIP.AZ1nXW2LL-KdxgqX62gqUQHaE8?rs=1&pid=ImgDetMain" rounded className="mt-2" style={{ width: '200px', height: '200px' }} />
                                        </Col>
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
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Booking;
