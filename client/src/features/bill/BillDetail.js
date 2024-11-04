import React, { useEffect, useState } from "react";
import { Button, Container, Spinner, Alert, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchBillDetailQuery, useUpdateBillMutation } from "../../app/api/apiSlice";

const BillDetail = () => {
  const { billId } = useParams();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [updateBill] = useUpdateBillMutation();

  useEffect(() => {
    if (!billId) {
      navigate("dash/bill");
    }
  }, [billId, navigate]);

  const {
    data: billDetail,
    error,
    isLoading,
    refetch,
  } = useFetchBillDetailQuery(billId);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handlePayment = async () => {
    try {
      await updateBill({ id: billId, changes: { isPaid: true } });
      setShowSuccessModal(true);
      refetch(); // Refetch bill details to get updated data
    } catch (err) {
      console.error("Payment update failed:", err);
    }
  };

  if (isLoading) {
    return (
      <Container className="text-center my-4">
        <Spinner animation="border" />
        <p>Loading bills...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">Error: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <>
      <div className="border rounded my-4" style={{ margin: "0 10rem" }}>
        <h1 className="py-4 text-center">Bill</h1>
        <div className="d-flex justify-content-between mx-5 border-bottom mb-3">
          <p>Customer Name</p>
          <p>{billDetail?.customerName}</p>
        </div>
        <div className="d-flex justify-content-between mx-5 border-bottom mb-3">
          <p>Phone</p>
          <p>{billDetail?.phoneNumber}</p>
        </div>
        <div className="d-flex justify-content-between mx-5 border-bottom mb-3">
          <p>Arrive Date</p>
          <p>{new Date(billDetail?.arriveDate).toLocaleDateString()}</p>
        </div>
        <div className="d-flex justify-content-between mx-5 border-bottom">
          <p>Leave Date</p>
          <p>{new Date(billDetail?.leaveDate).toLocaleDateString()}</p>
        </div>
        {/* Room and Service Details */}
        <div className="mx-5 mt-5">
          <h5 className="fw-bolder">Room:</h5>
          <div className="d-flex">
            <p className="col-md-4 pt-3 pb-2 m-0 mb-1 me-1 bg-light text-center fw-bold">
              Category
            </p>
            <p className="col-md-4 pt-3 pb-2 m-0 mb-1 me-1 bg-light text-center fw-bold">
              Number
            </p>
            <p className="col-md-4 pt-3 pb-2 m-0 mb-1 me-1 pe-4 bg-light text-end rounded-end fw-bold">
              Price
            </p>
          </div>
          {billDetail?.roomDetails?.map((roomDetail, index) => (
            <div key={index} className="d-flex">
              <p className="col-md-4 pt-3 pb-2 m-0 mb-1 me-1 bg-light text-center">
                {roomDetail.roomCategory}
              </p>
              <p className="col-md-4 pt-3 pb-2 m-0 mb-1 me-1 bg-light text-center">
                {roomDetail.roomNumber}
              </p>
              <p className="col-md-4 pt-3 pb-2 m-0 mb-1 me-1 pe-4 bg-light text-end rounded-end">
                {roomDetail.price}
              </p>
            </div>
          ))}
        </div>
        <div className="mx-5 mt-5">
          <h5 className="fw-bolder">Service:</h5>
          <ul>
            {billDetail?.services?.map((service, index) => (
              <li key={index}>
                {service.serviceName}: {service.servicePrice} VND
              </li>
            ))}
          </ul>
        </div>
        <div className="d-flex justify-content-between mx-5 pt-5 pb-3 fw-bold">
          <p>Total Cost:</p>
          <p>{billDetail?.totalCost}</p>
        </div>
        <div className="d-flex justify-content-center my-3">
          {billDetail?.isPaid ? (
            <h5
              className="fw-bolder text-center bg-success text-white rounded py-1"
              style={{ width: "5rem" }}
            >
              PAID
            </h5>
          ) : (
            <Button variant="primary" onClick={handlePayment}>Pay Now</Button>
          )}
        </div>
      </div>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your payment has been processed successfully.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BillDetail;
