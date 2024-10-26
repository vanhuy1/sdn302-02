// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getServiceItemById, updateServiceItem, selectErrorMessage, selectLoading } from '../../../store/serviceSlice';
// import { Form, Button, Spinner, Alert } from 'react-bootstrap';

// const ServiceDetail = () => {
//   const { serviceId } = useParams();
//   const dispatch = useDispatch();

//   const serviceItem = useSelector(state => state.services.items.find(item => item.id === serviceId));
//   const loading = useSelector(selectLoading);
//   const errorMessage = useSelector(selectErrorMessage);

//   const [updatedName, setUpdatedName] = useState(serviceItem?.name || '');

//   useEffect(() => {
//     if (serviceId) {
//       dispatch(getServiceItemById(serviceId));
//     }
//   }, [dispatch, serviceId]);

//   useEffect(() => {
//     if (serviceItem) {
//       setUpdatedName(serviceItem.name);
//     }
//   }, [serviceItem]);

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     dispatch(updateServiceItem({ ...serviceItem, name: updatedName }));
//   };

//   if (loading) {
//     return <Spinner animation="border" />;
//   }

//   if (errorMessage) {
//     return <Alert variant="danger">{errorMessage}</Alert>;
//   }

//   return (
//     <div>
//       <h3>Service Detail</h3>
//       <Form onSubmit={handleUpdate}>
//         <Form.Group controlId="serviceName">
//           <Form.Label>Service Name</Form.Label>
//           <Form.Control 
//             type="text" 
//             value={updatedName} 
//             onChange={(e) => setUpdatedName(e.target.value)} 
//             placeholder="Enter service name" 
//           />
//         </Form.Group>
        
//         <Button type="submit" variant="primary" className="mt-3">Save Changes</Button>
//       </Form>
//     </div>
//   );
// };

// export default ServiceDetail;
