import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
    getStaffById,
    selectStaffDetail,
    selectLoading,
    selectErrorMessage,
    deleteStaff
} from "../../app/api/staffSlice";
import Header from "../../components/landing-page/header";
import Footer from "../../components/landing-page/footer";
import Sidebar from "../../components/Sidebar";
import Navtab from "../../components/management/Navtab";

const StaffDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const staffDetail = useSelector(selectStaffDetail);
    const isLoading = useSelector(selectLoading);
    const errorMessage = useSelector(selectErrorMessage);

    const handleDelete = (e) => {
        e.preventDefault();

        dispatch(deleteStaff({ _id: id })).then(() => {
            navigate("/manage/staff");
        });
    }

    useEffect(() => {
        dispatch(getStaffById(id));
    }, [dispatch, id]);

    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={2} className="bg-light shadow-sm">
                        <Sidebar />
                    </Col>
                    <Col md={10} className="mt-3 mb-5">
                        <Navtab />
                        <div className="mt-5 mx-2 py-4 border rounded">
                            <h3 className="ms-4">Staff Details</h3>
                            {isLoading && (
                                <p className="ms-4">Loading staff details...</p>
                            )}
                            {errorMessage && (
                                <p className="ms-4 text-danger">
                                    Error fetching staff details: {errorMessage}
                                </p>
                            )}
                            {staffDetail && (
                                <div className="ms-4 mt-3">
                                    <p>
                                        <strong>Name:</strong>{" "}
                                        {staffDetail.staffName}
                                    </p>
                                    <p>
                                        <strong>Gender:</strong>{" "}
                                        {staffDetail.gender}
                                    </p>
                                    <p>
                                        <strong>Birthday:</strong>{" "}
                                        {staffDetail.birthday}
                                    </p>
                                    <p>
                                        <strong>Address:</strong>{" "}
                                        {staffDetail.address}
                                    </p>
                                    <p>
                                        <strong>Identity Number:</strong>{" "}
                                        {staffDetail.identityNumber}
                                    </p>
                                    <p>
                                        <strong>Position:</strong>{" "}
                                        {staffDetail.position}
                                    </p>
                                    <p>
                                        <strong>Salary:</strong>{" "}
                                        {staffDetail.salary}
                                    </p>
                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {staffDetail.email}
                                    </p>
                                    <p>
                                        <strong>Phone Number:</strong>{" "}
                                        {staffDetail.phoneNumber}
                                    </p>
                                    <p>
                                        {/* <strong>Active:</strong>{" "} */}
                                        <strong>
                                            {staffDetail.active
                                                ? "Active"
                                                : "Inactive"}
                                        </strong>
                                    </p>
                                    <div>
                                        <Button
                                            className="me-2"
                                            variant="warning"
                                            href={`/manage/staff/update/${staffDetail._id}`}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            className="me-2"
                                            variant="danger"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="primary"
                                            href="/manage/staff"
                                        >
                                            Back to Staff List
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default StaffDetail;
