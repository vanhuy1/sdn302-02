import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner, Table, Container, Alert } from "react-bootstrap";
import { useFetchBillsQuery } from '../../app/api/apiSlice';

const BillList = () => {
    // Destructure the query to get refetch function
    const { data: bills, error, isLoading, refetch } = useFetchBillsQuery();

    // Effect to refetch data on component mount or when navigating back
    useEffect(() => {
        refetch();
    }, [refetch]);

    // Loading state
    if (isLoading) {
        return (
            <Container className="text-center my-4">
                <Spinner animation="border" />
                <p>Loading bills...</p>
            </Container>
        );
    }

    // Error handling
    if (error) {
        return (
            <Container className="my-4">
                <Alert variant="danger">
                    Error: {error.message}
                </Alert>
            </Container>
        );
    }

    // No bills available
    if (!bills || bills.length === 0) {
        return (
            <Container className="text-center my-4">
                <h2>No Bills Available</h2>
                <p>Please check back later.</p>
            </Container>
        );
    }

    return (
        <Container>
            <h1 className="text-center my-4">Bill List</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Bill ID</th>
                        <th>Customer Name</th>
                        <th>Total Cost</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill) => (
                        <tr key={bill._id}>
                            <td>{bill._id}</td>
                            <td>{bill.customerName}</td>
                            <td>{bill.totalCost}</td>
                            {bill.isPaid ? <td className="text-success fw-semibold">PAID</td> : <td className="text-danger fw-semibold">UNPAID</td>}
                            <td>
                                <Link to={`${bill._id}`} className="btn btn-info">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default BillList;