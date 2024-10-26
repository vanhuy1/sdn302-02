import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useAddNewUserMutation } from './usersApiSlice';
import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

// const USER_REGEX = /^[A-z0-9]{3,20}$/
// const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/


const RegisterForm = () => {


    const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        address: '',
        gender: 'Male',
        birthDay: '',
        identifyNumber: '',
        phoneNumber: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await addNewUser(formData).unwrap()
            alert("Register successfully!")
            setFormData({
                username: '',
                password: '',
                name: '',
                address: '',
                gender: 'Male',
                birthDay: '',
                identifyNumber: '',
                phoneNumber: '',
            })
            navigate('/login')
        } catch (err) {
            console.error('Failed to register: ', err)
        }
    }
    return (
        <>
            <section className="h-100" style={{ backgroundColor: "#DFF2EB" }}>
                <Container className="py-5 h-100">
                    <Row className="d-flex justify-content-center align-items-center h-100">
                        <Col lg={8} xl={6}>
                            <Card className="rounded-3">
                                <Card.Img
                                    variant="top"
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
                                    style={{ borderTopLeftRadius: '.3rem', borderTopRightRadius: '.3rem', height: '100px' }}
                                    alt="Sample photo"
                                />
                                <Card.Body className="p-4 p-md-5" style={{ backgroundColor: "#B9E5E8" }}>
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>
                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="name">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="Enter your name"
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="username">
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="username"
                                                        autoComplete="off"
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                        placeholder="Enter your username"
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="password">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="Enter your password"
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="gender">
                                                    <Form.Label>Gender</Form.Label>
                                                    <Form.Select
                                                        name="gender"
                                                        value={formData.gender}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="address">
                                                    <Form.Label>Address</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleChange}
                                                        placeholder="Enter your address"
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="birthday">
                                                    <Form.Label>Birthday</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="birthDay"
                                                        value={formData.birthDay}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="identifyNumber">
                                                    <Form.Label>Identify Number</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="identifyNumber"
                                                        value={formData.identifyNumber}
                                                        onChange={handleChange}
                                                        placeholder="Enter your identify number"
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="phoneNumber">
                                                    <Form.Label>Phone Number</Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        name="phoneNumber"
                                                        value={formData.phoneNumber}
                                                        onChange={handleChange}
                                                        placeholder="Enter your phone number"
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Button variant="primary" type="submit">Register</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
};

export default RegisterForm;
