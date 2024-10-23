import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Content from "../../components/services/common/content";
import Header from "../../components/landing-page/header";
import Footer from "../../components/landing-page/footer";
import Sidebar from "../../components/Sidebar";

const Services = () => {
    return (
        <>
            <Header />
            <Row className="flex-grow-1">
                <Col xs={12} md={1} className="p-0">
                    <Sidebar />
                </Col>
                <Col xs={12} md={9} className="p-3">
                    <Content />
                </Col>
            </Row>
            <Footer />
        </>
    );
};

export default Services;
