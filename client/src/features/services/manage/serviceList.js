import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const API_URL = 'http://localhost:3500';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({ serviceName: '', description: '', serviceItems: [] });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${API_URL}/services`);
                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }
                const data = await response.json();
                setServices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleEdit = (service) => {
        setEditingService(service);
        setFormData({
            serviceName: service.serviceName,
            description: service.description,
            serviceItems: service.serviceItems,
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                const response = await fetch(`${API_URL}/services/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete service');
                }
                // Update state to remove deleted service
                setServices(services.filter(service => service._id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/services/${editingService._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update service');
            }
            const updatedService = await response.json();
            // Update the state to reflect the edited service
            setServices(services.map(service => (service._id === updatedService._id ? updatedService : service)));
            setEditingService(null); // Reset editing state
        } catch (err) {
            setError(err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    if (loading) return <p>Loading services...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={sectionStyle}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Service List</h2>
            <form onSubmit={handleFormSubmit} style={{ marginBottom: '20px' }}>
                <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
                <input 
                    type="text" 
                    name="serviceName" 
                    value={formData.serviceName} 
                    onChange={handleChange} 
                    placeholder="Service Name" 
                    required 
                    className="form-control" 
                />
                <input 
                    type="text" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    placeholder="Description" 
                    required 
                    className="form-control" 
                />
                <button type="submit" className="btn btn-primary">
                    {editingService ? 'Update Service' : 'Add Service'}
                </button>
            </form>
            {services.map(service => (
                <div key={service._id} style={serviceContainerStyle}>
                    <h3 style={{ color: '#4CAF50' }}>{service.serviceName}</h3>
                    <p>{service.description}</p>
                    {service.serviceItems.length > 0 ? (
                        <table style={tableStyle} className="table">
                            <thead>
                                <tr>
                                    <th style={headerStyle}>Item Name</th>
                                    <th style={headerStyle}>Cost</th>
                                    <th style={headerStyle}>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {service.serviceItems.map(item => (
                                    <tr key={item._id}>
                                        <td style={cellStyle}>{item.itemName}</td>
                                        <td style={cellStyle}>${item.cost}</td>
                                        <td style={cellStyle}>{item.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No items available for this service.</p>
                    )}
                    <button onClick={() => handleEdit(service)} className="btn btn-warning me-2">Edit</button>
                    <button onClick={() => handleDelete(service._id)} className="btn btn-danger">Delete</button>
                </div>
            ))}
        </div>
    );
};

// Inline styles
const sectionStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginTop: '30px',
    marginBottom: '30px'
};

const serviceContainerStyle = {
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
};

const headerStyle = {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'left',
    border: '1px solid #ddd',
};

const cellStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
};

export default ServiceList;
