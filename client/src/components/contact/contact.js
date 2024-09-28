import React from 'react';
import FooterComponent from '../landing-page/footer';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import Header from '../landing-page/header';

const Contact = () => {
    return (
        <div>
            <Header />

            <div className="banner"
                style={{
                    backgroundImage: 'url(https://images7.alphacoders.com/134/1342217.png)',
                    height: '27vh',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
            </div>
            <Container className="mt-5">
                <Row className="mb-4">
                    <Col md={6}>
                        <Image
                            src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/b9422a2eaf6f6f0900e38430221bae4d.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp"
                            rounded fluid
                            style={{
                                width: '300px',
                                height: '300px'
                            }}
                        />
                    </Col>
                    <Col md={6}>
                        <h2>Contact</h2>
                        <p>
                            Experience luxury at our hotel with top-notch facilities and outstanding services.
                            Whether you're traveling for business or leisure, we provide a tranquil and sophisticated environment that guarantees a memorable stay.
                        </p>
                        <Button variant="primary" href="#book">Book Now</Button>
                    </Col>
                </Row>
            </Container>

            <FooterComponent />
        </div>
    );
};

export default Contact;