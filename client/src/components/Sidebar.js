import React from "react";
import { Link } from 'react-router-dom'
import { Container, Nav, Button } from "react-bootstrap";
import {
    FaHome,
    FaBook,
    FaCog,
    FaConciergeBell,
    FaUser,
    FaClipboardList,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
const Sidebar = () => {
    const { isManager } = useAuth()
    return (
        <Container fluid>
            <Nav className="flex-column mt-3 bg-light vh-100">
                <Nav.Link
                    href="/dash"
                    className="text-dark d-flex align-items-center nav-item-custom rounded py-3 fs-6"
                >
                    <FaHome className="me-3 ms-4 fs-5" /> Home
                </Nav.Link>
                <Button variant="outline-primary" className="me-2">< FaBook className="me-3 ms-4 fs-5 align-items-left" />
                    <Link to="/dash/booking" style={{ textDecoration: 'none' }}>  Booking</Link>
                </Button>
                <Button variant="outline-primary" className="me-2">
                    <Link to="/dash/services" style={{ textDecoration: 'none' }}> services</Link>
                </Button>

                {(isManager) && <Button variant="outline-primary" className="me-2"> <FaCog className="me-3 ms-4 fs-5 align-items-left" />
                    <Link to="/dash/manage/users" style={{ textDecoration: 'none' }}> Manange</Link>
                </Button>}

                <Nav.Link
                    href="/dash"
                    className="text-dark d-flex align-items-center nav-item-custom rounded py-3 fs-6"
                >
                    <FaClipboardList className="me-3 ms-4 fs-5" /> Bill
                </Nav.Link>
                <Nav.Link
                    href="/user"
                    className="text-dark d-flex align-items-center nav-item-custom rounded py-3 fs-6"
                >
                    <FaUser className="me-3 ms-4 fs-5" /> User
                </Nav.Link>
            </Nav>
        </Container>
    );
};

export default Sidebar;
