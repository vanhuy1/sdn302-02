import React, { useEffect } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaInfoCircle, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom'

import {
  selectLoading,
  selectErrorMessage,
  selectAllStaffs,
  getAllStaffs,
  deleteStaff,
} from "../../store/staffSlice";
import { useNavigate } from "react-router-dom";

const Staffs = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const errorMessage = useSelector(selectErrorMessage);
  const staffs = useSelector(selectAllStaffs);

  const navigate = useNavigate();

  const handleDelete = (e, id) => {
    e.preventDefault();

    dispatch(deleteStaff({ _id: id })).then(() => {
      navigate("dash/manage/staff");
    });
  };

  useEffect(() => {
    dispatch(getAllStaffs());
  }, [dispatch]);

  return (
    <>
      <Row>

        <Col md={10} className="mt-3 mb-5">

          <div className="mt-5 mx-2 py-4 border rounded">
            <h3 className="ms-4">Staff</h3>
            {isLoading && <p className="ms-4">Loading staff data...</p>}
            {errorMessage && (
              <p className="ms-4 text-danger">
                Error fetching staff: {errorMessage}
              </p>
            )}
            <Table striped bordered hover responsive className="mx-4">
              <thead>
                <tr>
                  <th></th>
                  <th>Staff Name</th>
                  <th>Gender</th>
                  <th>Identity Number</th>
                  <th>Position</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffs.length > 0 ? (
                  staffs.map((staff, index) => (
                    <tr key={staff._id}>
                      <td>{index + 1}</td>
                      <td>{staff.staffName}</td>
                      <td>{staff.gender}</td>
                      <td>{staff.identityNumber}</td>
                      <td>{staff.position}</td>
                      <td>{staff.phoneNumber}</td>
                      <td>
                        <Button
                          variant="info"
                          href={`/manage/staff/${staff._id}`}
                          className="me-1"
                        >
                          <FaInfoCircle className="m-0 fs-5" />
                        </Button>
                        <Button
                          variant="warning"
                          href={`/manage/staff/update/${staff._id}`}
                          className="me-1"
                        >
                          <FaEdit className="m-0 fs-5" />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={(e) => handleDelete(e, staff._id)}
                        >
                          <FaTrash className="m-0 fs-5" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No staff found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="ms-4 my-3">
              <Button variant="primary" >
                <Link to='dash/manage/staff/update/add'>Add</Link>

              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Staffs;
