import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Button, Form, Badge, Pagination, Modal, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { ViewAllRoom, clearError, ViewRoomCategory, CreateRoom, DeleteRoom } from '../../features/room/RoomSlice'; // Adjust the import path based on your project structure
import Header from "../../components/landing-page/header";
import Footer from "../../components/landing-page/footer";
import Sidebar from "../../components/landing-page/sidebar";
import Navtab from "../../components/management/Navtab";

const ViewAllRooms = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { rooms, loading, error, roomCategories } = useSelector((state) => state.room);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    // Pagination handling
    const itemsPerPage = 10;
    const totalPages = Math.ceil(rooms.length / itemsPerPage);

    const handleViewRoom = () => {
        navigate('/room');  // Programmatically navigate to /viewroom
    };

    const handleViewCategory = () => {
        navigate('/category');  // Programmatically navigate to /viewroom
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        dispatch(ViewAllRoom());
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleAddRoom = () => {
        dispatch(ViewRoomCategory()); // Fetch categories
        setShowModal(true); // Show modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close modal
    };

    const handleCategorySelect = (category) => {
        setSelectedCategoryId(category);
    };

    const handleConfirm = () => {
        if (selectedCategoryId) {
            console.log("Selected Category ID:", selectedCategoryId);

            dispatch(CreateRoom({ categoryRoomId: selectedCategoryId }))
                .unwrap()  
                .then(() => {
                    window.alert("Room created successfully!");  
                    window.location.reload();  
                })
                .catch((error) => {
                    window.alert("Failed to create room: " + error);  
                });

            handleCloseModal();  
        }
    };


    const handleDelete = (roomID) => {
        console.log("Deleting room with ID:", roomID);
        dispatch(DeleteRoom({ roomId: roomID }))
            .then((result) => {
                if (DeleteRoom.fulfilled.match(result)) {
                    alert("Delete done");
                    window.location.reload();
                } else if (DeleteRoom.rejected.match(result)) {
                    alert("Failed to delete room: " + result.error.message);
                }
            })
            .catch((error) => {
                console.error("Delete error:", error);
                alert("Something went wrong: " + error.message);
            });
    };



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                        <Outlet />
                        <Col xs={10}>
                            {/* Guests Table */}
                            <Row className="mb-3">
                                <Col>
                                    <h5>Room management</h5>
                                </Col>
                                <Col className="text-end mt-4">
                                    <Button onClick={() => handleAddRoom()} variant="outline-primary" className="me-2">Add new room</Button>
                                    <Button onClick={handleViewCategory} variant="outline-primary" className="me-2">View room category</Button>
                                    <Button onClick={handleViewRoom} variant="outline-primary" className="me-2">View room </Button>
                                </Col>
                            </Row>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Room number</th>
                                        <th>Room category</th>
                                        <th>Start Date</th>
                                        <th>End date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((room, index) => (
                                        <tr key={room.roomID}>
                                            <td>{index + 1}</td>
                                            <td>{room.roomNumber}</td>
                                            <td>{room.roomCategoryName}</td>
                                            <td>{room.startDate ? room.startDate : 'Empty booking'}</td>
                                            <td>{room.endDate ? room.endDate : 'Empty booking'}</td>
                                            <td>
                                                <Badge bg={room.status === 'B' ? 'success' :
                                                    room.status === 'R' ? 'danger' :
                                                        room.status === 'E' ? 'warning' :
                                                            'info'}>
                                                    {room.status}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Button onClick={() => handleDelete(room.roomID)} variant="outline-danger" className="me-2">Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            {/* Pagination */}
                            <Pagination className="justify-content-center">
                                <Pagination.Prev
                                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                    disabled={currentPage === 1}
                                />
                                {Array.from({ length: totalPages }).map((_, idx) => (
                                    <Pagination.Item
                                        key={idx + 1}
                                        active={idx + 1 === currentPage}
                                        onClick={() => handlePageChange(idx + 1)}
                                    >
                                        {idx + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                />
                            </Pagination>
                        </Col>
                    </Col>
                </Row>
            </Container>
            <Footer />
            {/* Category Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">Select a Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {roomCategories.map((category) => (
                            <ListGroup.Item
                                key={category._id}
                                onClick={() => handleCategorySelect(category._id)}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: '#f8f9fa', // Light background for list items
                                    transition: 'background-color 0.3s', // Smooth transition
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e6ea'} // Hover effect
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'} // Revert on leave
                            >
                                {category.roomCategoryName}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleConfirm(selectedCategoryId)}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    );
};

export default ViewAllRooms;
