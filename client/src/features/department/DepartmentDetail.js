import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  getDepartmentById,
  selectDepartmentDetail,
  selectLoading,
  deleteDepartment,
} from "../../store/departmentSlice";

const DepartmentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const departmentDetail = useSelector(selectDepartmentDetail);
  const isLoading = useSelector(selectLoading);

  const handleDelete = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDepartment({ _id: id })).then(() => {
          Swal.fire(
            'Deleted!',
            'The department has been deleted.',
            'success'
          );
          navigate("/dash/manage/departments");
        }).catch((error) => {
          Swal.fire(
            'Error!',
            'There was a problem deleting the department.',
            'error'
          );
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getDepartmentById({ _id: id }));
  }, [dispatch, id]);

  return (
    <>
      <div className="mt-5 mx-2 py-4 border rounded">
        <h3 className="ms-4">Department Detail</h3>
        {isLoading && <p className="ms-4">Loading department details...</p>}
        {departmentDetail && (
          <div className="ms-4 mt-3">
            <p>
              <strong>Department Name:</strong> {departmentDetail.departmentName}
            </p>
            <div>
              <Button
                className="me-2"
                variant="warning"
                onClick={() => navigate(`/dash/manage/departments/update/${departmentDetail._id}`)}
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
                onClick={() => navigate("/dash/manage/departments")}
              >
                Back to Department List
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DepartmentDetail;