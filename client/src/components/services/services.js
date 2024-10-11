import React from "react";
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import TaskBar from "../taskbar/taskbar";
import Content from "./common/content";

const Services = () => {
    return (
        <>
            <header>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#">
                        <img
                            src="https://img.freepik.com/premium-vector/hotel-icon-logo-vector-design-template_827767-3569.jpg"
                            alt="Logo"
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                            style={{ marginLeft: "30px" }}
                        />{" "}
                    </Navbar.Brand>

                    <h2 style={{ marginLeft: "100px" }}> CODER HOTEL </h2>

                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        className="justify-content-end"
                        style={{ marginRight: "30px" }}
                    >
                        <Nav className="me-5">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/services">Services</Nav.Link>
                            <Nav.Link href="/contact">Contact</Nav.Link>
                        </Nav>

                        <Button variant="outline-primary" className="me-2">
                            Register
                        </Button>
                        <Button variant="outline-primary">
                            <Link
                                to="/login"
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                Login
                            </Link>
                        </Button>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    <TaskBar />
                    <Content />
                </div>
            </div>
            <footer className="bg-light text-center text-lg-start">
                <Container className="p-4">
                    <Row>
                        <Col lg={4} md={6} className="mb-4 mb-md-0">
                            <h5 className="text-uppercase">Hotel Management</h5>
                            <p>Welcome to our hotel.</p>
                        </Col>

                        <Col lg={4} md={6} className="mb-4 mb-md-0">
                            <h5 className="text-uppercase">SERVICES</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#about" className="text-dark">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#services" className="text-dark">
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a href="#contact" className="text-dark">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </Col>

                        <Col lg={4} md={12} className="mb-4 mb-md-0">
                            <h5 className="text-uppercase">Legal</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#privacy" className="text-dark">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#terms" className="text-dark">
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a href="#faq" className="text-dark">
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>

                <div className="text-center p-3 bg-dark text-white">
                    © 2024 My Website. All rights reserved.
                </div>
            </footer>
        </>
    );
};

const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Make the wrapper full height
    },
    container: {
        display: "flex",
        flex: 1, // Allow this div to fill the available space
    },
};

export default Services;
