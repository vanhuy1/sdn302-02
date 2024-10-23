import React from "react";
import { Container, Nav } from "react-bootstrap";
import {
    FaHome,
    FaBook,
    FaCog,
    FaConciergeBell,
    FaUser,
    FaClipboardList,
} from "react-icons/fa";

const Sidebar = () => {
    return (
        <Container fluid>
            <Nav className="flex-column mt-3 bg-light vh-100">
                <Nav.Link
                    href="/"
                    className="text-dark d-flex align-items-center nav-item-custom rounded py-3 fs-6"
                >
                    <FaHome className="me-3 ms-4 fs-5" /> Home
                </Nav.Link>
                <Nav.Link
                    href="/booking"
                    className="text-dark d-flex align-items-center nav-item-custom rounded py-3 fs-6"
                >
                    <FaBook className="me-3 ms-4 fs-5" /> Booking
                </Nav.Link>
                <Nav.Link
                    href="/services"
                    className="text-dark d-flex align-items-center nav-item-custom rounded py-3 fs-6"
                >
                    <FaConciergeBell className="me-3 ms-4 fs-5" /> Services
                </Nav.Link>
                <Nav.Link
                    href="/manage/staff"
                    className="text-dark d-flex align-items-center nav-item-custom rounded py-3 fs-6"
                >
                    <FaCog className="me-3 ms-4 fs-5" /> Manage
                </Nav.Link>
                <Nav.Link
                    href="/bill"
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
