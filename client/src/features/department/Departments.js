import React, { useState, useEffect } from "react";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaInfoCircle, FaEdit, FaTrash } from "react-icons/fa";
import { FaArrowDownWideShort, FaArrowUpShortWide } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  selectLoading,
  selectAllDepartments,
  getAllDepartments,
  deleteDepartment,
} from "../../store/departmentSlice";

const Departments = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const departments = useSelector(selectAllDepartments);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("departmentName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

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
        dispatch(deleteDepartment({ _id: id }))
          .then(() => {
            Swal.fire(
              "Deleted!",
              "The department has been deleted.",
              "success"
            );
            dispatch(getAllDepartments());
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "There was a problem deleting the department.",
              "error"
            );
          });
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortFieldChange = (e) => {
    const newSortField = e.target.value;
    if (newSortField === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(newSortField);
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  const filteredDepartments = departments.filter((department) => {
    const matchesSearch =
      department.departmentName &&
      department.departmentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const sortedDepartments = [...filteredDepartments].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const totalPages = Math.ceil(sortedDepartments.length / 5);
  const indexOfLastDepartment = currentPage * 5;
  const indexOfFirstDepartment = indexOfLastDepartment - 5;
  const currentDepartments = sortedDepartments.slice(
    indexOfFirstDepartment,
    indexOfLastDepartment
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="mx-2 border rounded">
        <h2 className="text-center mt-3 mb-3">Departments</h2>
        {isLoading && <p className="ms-4">Loading department data...</p>}

        {/* Search and Filter */}
        <div className="mx-4 mb-3">
          <Row>
            <Col md={12} xs={12}>
              <Form.Label className="fw-bold m-0 mt-2 mb-sm-2" htmlFor="search">
                Search:
              </Form.Label>
            </Col>
            <Col md={12} xs={12}>
              <Form.Control
                id="search"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
        </div>
        <div className="mx-4 d-flex justify-content-between align-items-center mb-3">
          <Form.Label className="fw-bold m-0 me-2" htmlFor="sort">
            Sort:
          </Form.Label>
          <Form.Select
            id="sort"
            value={sortField}
            onChange={handleSortFieldChange}
            className="me-2"
          >
            <option value="departmentName">Sort by Department Name</option>
          </Form.Select>
          <Button
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
          >
            {sortDirection === "asc" ? (
              <FaArrowUpShortWide />
            ) : (
              <FaArrowDownWideShort />
            )}
          </Button>
        </div>

        <Table striped bordered hover responsive className="mx-4">
          <thead>
            <tr>
              <th></th>
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentDepartments.length > 0 ? (
              currentDepartments.map((department, index) => (
                <tr key={department._id}>
                  <td>{index + 1 + (currentPage - 1) * 5}</td>
                  <td>
                    <Link
                      to={`${department._id}`}
                      className="text-decoration-none"
                    >
                      {department.departmentName}
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="btn btn-outline-success me-1"
                      type="button"
                      to={`${department._id}`}
                      style={{ padding: "2px 5px" }}
                    >
                      <FaInfoCircle className="m-0" style={{ width: "20px" }} />
                    </Link>
                    <Link
                      className="btn btn-warning me-1"
                      to={`update/${department._id}`}
                      style={{ padding: "2px 5px" }}
                    >
                      <FaEdit className="m-0" style={{ width: "20px" }} />
                    </Link>
                    <Button
                      variant="danger"
                      onClick={(e) => handleDelete(e, department._id)}
                      style={{ padding: "2px 5px" }}
                    >
                      <FaTrash className="m-0" style={{ width: "20px" }} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No department found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {/* Pagination Controls */}
        <div className="d-flex justify-content-between mx-4 my-3">
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
        <div className="ms-4 my-3">
          <Link className="btn btn-warning" to="update/add">
            Add
          </Link>
        </div>
      </div>
    </>
  );
};

export default Departments;
