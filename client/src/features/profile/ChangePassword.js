import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  changePassword,
  selectLoading,
  selectErrorMessage,
} from "../../store/profileSlice";
import NavProfile from "./NavProfile";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const errorMessage = useSelector(selectErrorMessage);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password validation function
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumbers &&
      hasSpecialChars
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "New passwords do not match.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // Validate new password
    if (!validatePassword(newPassword)) {
      Swal.fire({
        title: "Error!",
        text: "New password must be at least 8 characters long and contain uppercase letters, lowercase letters, numbers, and special characters.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await dispatch(changePassword({ currentPassword, newPassword })).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Password changed successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to change password.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <NavProfile />
      <div className="mt-5 mx-2 py-4 border rounded">
        <h3 className="text-center">Change Password</h3>
        {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
        <Row className="mt-4">
          <Col md={3}></Col>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="currentPassword">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  required
                />
              </Form.Group>
              <Form.Group controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </Form.Group>
              <div className="text-center">
                <Button
                  variant="success me-2"
                  className="mt-3"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Changing..." : "Change Password"}
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

export default ChangePassword;