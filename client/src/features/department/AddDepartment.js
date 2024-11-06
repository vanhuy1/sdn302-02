import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getDepartmentById,
  selectDepartmentDetail,
  selectLoading,
  addDepartment,
  updateDepartment,
  selectErrorMessage,
} from "../../store/departmentSlice";

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [formMode, setFormMode] = useState("add");

  const errorMessage = useSelector(selectErrorMessage);

  const errors = {
    departmentName: "Department name is required",
  };

  const renderErrorMessage = (name) =>
    errorMessages[name] && (
      <p className="text-danger mb-3">{errorMessages[name]}</p>
    );

  const { id } = useParams();
  const dispatch = useDispatch();
  const departmentDetail = useSelector(selectDepartmentDetail);
  const isLoading = useSelector(selectLoading);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages({});

    const data = {
      departmentName,
    };

    // Validate input
    const newErrors = {};
    Object.keys(errors).forEach((key) => {
      if (!data[key]) {
        newErrors[key] = errors[key];
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
      return;
    }

    const action =
      id !== "add"
        ? updateDepartment({ _id: id, updatedData: data })
        : addDepartment({ departmentData: data });

    try {
      await dispatch(action).unwrap();
      const successMessage =
        id !== "add"
          ? "Department updated successfully!"
          : "Department added successfully!";
      Swal.fire({
        icon: "success",
        title: successMessage,
        showConfirmButton: false,
        timer: 1500,
      });
      resetFormState();
      navigate("/dash/manage/departments");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "There was a problem saving the department.",
      });
    }
  };

  const resetFormState = () => {
    setDepartmentName("");
    setErrorMessages({});
  };

  useEffect(() => {
    if (id !== "add") {
      setFormMode("edit");
      dispatch(getDepartmentById({ _id: id }));
    } else {
      setFormMode("add");
      resetFormState();
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id !== "add" && departmentDetail) {
      setDepartmentName(departmentDetail.departmentName);
    }
  }, [departmentDetail, id]);

  return (
    <>
      <div className="mt-5 mx-2 py-4 border rounded">
        <h3 className="text-center">
          {id === "add" ? "Add Department" : "Update Department"}
        </h3>
        {isLoading && <p className="text-center">Loading department details...</p>}
        {errorMessage && (
          <p className="text-center text-danger mt-3">{errorMessage}</p>
        )}
        <Row className="mt-4 d-flex">
          <Col md={3}></Col>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Label htmlFor="name">
                Department Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                id="name"
                className={errorMessages.departmentName ? "" : "mb-3"}
                name="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="Department name..."
              />
              {renderErrorMessage("departmentName")}
              <div className="text-center">
                <Button variant="success me-2" className="mt-3" type="submit">
                  Save
                </Button>
                <Button
                  variant="danger"
                  className="mt-3"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Col>
          <Col md={3}></Col>
        </Row>
      </div>
    </>
  );
};

export default AddDepartment;
