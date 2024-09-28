import React from 'react';
import { Container, Nav, Row, Col } from 'react-bootstrap';
import { FaHome, FaBook, FaCog, FaReceipt, FaUser, FaMoneyBill } from 'react-icons/fa';
import './sidebar.css';

const Sidebar = () => {
    return (
        <Container fluid>
            <Row>
                <Col md={2} className="sidebar bg-light vh-100">
                    <Nav className="flex-column">
                        <Nav.Link href="/" className="text-dark d-flex align-items-center nav-item-custom">
                            <FaHome className="me-3" /> Home
                        </Nav.Link>
                        <Nav.Link href="/booking" className="text-dark d-flex align-items-center nav-item-custom">
                            <FaBook className="me-3" /> Booking
                        </Nav.Link>
                        <Nav.Link href="/services" className="text-dark d-flex align-items-center nav-item-custom">
                            <FaCog className="me-3" /> Services
                        </Nav.Link>
                        <Nav.Link href="/manage" className="text-dark d-flex align-items-center nav-item-custom">
                            <FaReceipt className="me-3" /> Manage
                        </Nav.Link>
                        <Nav.Link href="/bill" className="text-dark d-flex align-items-center nav-item-custom">
                            <FaMoneyBill className="me-3" /> Bill
                        </Nav.Link>
                        <Nav.Link href="/user" className="text-dark d-flex align-items-center nav-item-custom">
                            <FaUser className="me-3" /> User
                        </Nav.Link>
                    </Nav>
                </Col>
            </Row>
        </Container>
    );
};

export default Sidebar;
