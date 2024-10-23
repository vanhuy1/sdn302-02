import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Container, Image, Form } from "react-bootstrap";
import Logo from "../../assets/images/logo192.png";
import Header from "../../components/landing-page/header";
import Footer from "../../components/landing-page/footer";
import Sidebar from "../../components/Sidebar";
import Navtab from "../../components/management/Navtab";
import { useNavigate, useParams } from "react-router-dom";
import {
    getStaffById,
    selectStaffDetail,
    selectLoading,
    selectErrorMessage,
    addStaff,
    updateStaff,
} from "../../app/api/staffSlice";

const AddStaff = () => {
    const [staffName, setStaffName] = useState("");
    const [gender, setGender] = useState("Male");
    const [birthday, setBirthday] = useState("");
    const [address, setAddress] = useState("");
    const [identityNumber, setIdentityNumber] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState(0);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [departmentID, setDepartmentID] = useState("");

    const { id } = useParams();
    const dispatch = useDispatch();
    const staffDetail = useSelector(selectStaffDetail);
    const isLoading = useSelector(selectLoading);
    const errorMessage = useSelector(selectErrorMessage);

    const navigate = useNavigate();

    const handleCancle = () => {
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id !== "add") {
            const updatedData = {
                staffName,
                gender,
                birthday,
                address,
                identityNumber,
                position,
                salary,
                email,
                phoneNumber,
                departmentID,
            };

            dispatch(updateStaff({ _id: id, updatedData })).then(() => {
                navigate("/manage/staff");
            });
        } else {
            const data = {
                staffName,
                gender,
                birthday,
                address,
                identityNumber,
                position,
                salary,
                email,
                phoneNumber,
                departmentID,
            };

            dispatch(addStaff({ data })).then(() => {
                navigate("/manage/staff");
            });
        }
    };

    useEffect(() => {
        if (id !== "add") {
            dispatch(getStaffById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (staffDetail) {
            setStaffName(staffDetail.staffName);
            setGender(staffDetail.gender);
            setBirthday(staffDetail.birthday || "");
            setAddress(staffDetail.address);
            setIdentityNumber(staffDetail.identityNumber);
            setPosition(staffDetail.position);
            setSalary(staffDetail.salary || 0);
            setEmail(staffDetail.email);
            setPhoneNumber(staffDetail.phoneNumber);
            setDepartmentID(staffDetail.departmentID || "");
        }
    }, [staffDetail]);

    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={2} className="bg-light shadow-sm">
                        <Sidebar />
                    </Col>
                    <Col md={10} className="mt-3 mb-5">
                        <p className="fs-4 fw-semibold">Manage</p>
                        <Navtab />
                        <div className="mt-5 mx-2 py-4 border rounded">
                            <h3 className="text-center">
                                {id === "add" ? "Add Staff" : "Update Staff"}
                            </h3>
                            {isLoading && <p className="text-center">Loading staff details...</p>}
                            {errorMessage && (
                                <p className="text-center text-danger">
                                    <strong>Error fetching staff details: {errorMessage}</strong>
                                </p>
                            )}
                            <Row className="mt-4">
                                <Col md={3} className="mx-4 text-center">
                                    <Image
                                        src={Logo}
                                        rounded
                                        className="border"
                                        width="200"
                                        height="200"
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Label htmlFor="name">
                                            Name
                                        </Form.Label>
                                        <Form.Control
                                            id="name"
                                            className="mb-3"
                                            value={staffName}
                                            onChange={(e) =>
                                                setStaffName(e.target.value)
                                            }
                                        />
                                        <Form.Label htmlFor="gender">
                                            Gender
                                        </Form.Label>
                                        <Form.Select
                                            className="mb-3"
                                            value={gender}
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">
                                                Female
                                            </option>
                                            <option value="Other">Other</option>
                                        </Form.Select>
                                        <Form.Label htmlFor="birthday">
                                            Birthday
                                        </Form.Label>
                                        <Form.Control
                                            id="birthday"
                                            type="date"
                                            className="mb-3"
                                            value={birthday}
                                            onChange={(e) =>
                                                setBirthday(e.target.value)
                                            }
                                        />
                                        <Form.Label htmlFor="address">
                                            Address
                                        </Form.Label>
                                        <Form.Control
                                            id="address"
                                            className="mb-3"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                        />
                                        <Form.Label htmlFor="identity-number">
                                            Identity Number
                                        </Form.Label>
                                        <Form.Control
                                            id="identity-number"
                                            className="mb-3"
                                            value={identityNumber}
                                            onChange={(e) =>
                                                setIdentityNumber(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Form.Label htmlFor="position">
                                            Position
                                        </Form.Label>
                                        <Form.Control
                                            id="position"
                                            className="mb-3"
                                            value={position}
                                            onChange={(e) =>
                                                setPosition(e.target.value)
                                            }
                                        />
                                        <Form.Label htmlFor="salary">
                                            Salary
                                        </Form.Label>
                                        <Form.Control
                                            id="salary"
                                            className="mb-3"
                                            type="number"
                                            value={salary}
                                            onChange={(e) =>
                                                setSalary(e.target.value)
                                            }
                                        />
                                        <Form.Label htmlFor="email">
                                            Email
                                        </Form.Label>
                                        <Form.Control
                                            id="email"
                                            className="mb-3"
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                        <Form.Label htmlFor="phone">
                                            Phone Number
                                        </Form.Label>
                                        <Form.Control
                                            id="phone"
                                            className="mb-3"
                                            value={phoneNumber}
                                            onChange={(e) =>
                                                setPhoneNumber(e.target.value)
                                            }
                                        />
                                        <Form.Label htmlFor="department">
                                            Department
                                        </Form.Label>
                                        <Form.Select
                                            className="mb-3"
                                            value={departmentID}
                                            onChange={(e) =>
                                                setDepartmentID(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Choose a department
                                            </option>
                                            <option value="1">
                                                Department 1
                                            </option>
                                            <option value="2">
                                                Department 2
                                            </option>
                                            <option value="3">
                                                Department 3
                                            </option>
                                        </Form.Select>
                                        <div className="text-center">
                                            <Button
                                                variant="success me-2"
                                                className="mt-3"
                                                type="submit"
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="danger"
                                                className="mt-3"
                                                onClick={handleCancle}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>

                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default AddStaff;
