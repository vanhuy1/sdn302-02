import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaInfoCircle, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  selectLoading,
  selectAllStaffs,
  getAllStaffs,
  deleteStaff,
} from "../../store/staffSlice";

const Staffs = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const staffs = useSelector(selectAllStaffs);

  const handleDelete = (e, id) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStaff({ _id: id }))
          .then(() => {
            Swal.fire("Deleted!", "The staff has been deleted.", "success");
            dispatch(getAllStaffs());
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "There was a problem deleting the staff.",
              "error"
            );
          });
      }
    });
  };

  useEffect(() => {
    dispatch(getAllStaffs());
  }, [dispatch]);

  return (
    <>
      <div className="mt-5 mx-2 py-4 border rounded">
        <h3 className="ms-4">Staffs</h3>
        {isLoading && <p className="ms-4">Loading staff data...</p>}
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
                  <Link
                      className="btn btn-info me-1"
                      to={`${staff._id}`}
                    >
                      <FaInfoCircle className="m-0 fs-5" />
                    </Link>
                    <Link
                      className="btn btn-warning me-1"
                      to={`update/${staff._id}`}
                    >
                      <FaEdit className="m-0 fs-5" />
                    </Link>
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
          <Link className="btn btn-primary" to="update/add">
            Add
          </Link>
        </div>
      </div>
    </>
  );
};

export default Staffs;
