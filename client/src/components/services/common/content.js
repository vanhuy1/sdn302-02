import React, { useState } from 'react';
import { Tab, Nav, Row, Col, ListGroup, Container, Alert } from 'react-bootstrap';
import ServiceItem from './serviceItem';
import { useFetchServicesQuery } from "../../../app/api/apiSlice";
import ChosenList from './chosenList';

const Content = () => {
    const [activeTab, setActiveTab] = useState('choose');
    const [selectedService, setSelectedService] = useState(null);
    const [chosenServices, setChosenServices] = useState([]);

    const { data: serviceList, error, isLoading } = useFetchServicesQuery();

    if (isLoading) return <Alert variant="info">Loading...</Alert>;
    if (error) return <Alert variant="danger">Error: {error.message}</Alert>;

    const handleServiceClick = (service) => {
        setSelectedService(service);
    };

    const handleItemClick = (item) => {
        if (chosenServices.some(chosenItem => chosenItem._id === item._id)) {
            setChosenServices(chosenServices.filter(chosenItem => chosenItem._id !== item._id));
        } else {
            setChosenServices([...chosenServices, { ...item, serviceId: selectedService._id, serviceName: selectedService.serviceName }]);
        }
    };

    const handleRequestService = () => {
        const requestData = chosenServices.map(item => ({
            serviceId: item.serviceId,
            itemId: item._id,
            itemName: item.itemName,
            cost: item.cost
        }));

        fetch('/api/request-service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ services: requestData })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Service request sent successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error sending the service request.');
        });
    };

    return (
        <Container className="my-4">
            <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                <Nav variant="tabs" className="mb-4">
                    <Nav.Item>
                        <Nav.Link eventKey="choose">Choose Services</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="chosen">Chosen List</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    <Tab.Pane eventKey="choose">
                        <Row>
                            <Col md={4} className="mb-4">
                                <ListGroup>
                                    {serviceList && serviceList.map(service => (
                                        <ListGroup.Item
                                            key={service._id}
                                            onClick={() => handleServiceClick(service)}
                                            active={selectedService && selectedService._id === service._id}
                                            action
                                        >
                                            {service.serviceName}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col md={8}>
                                {selectedService ? (
                                    <>
                                        <h3>{selectedService.serviceName}</h3>
                                        <p>{selectedService.description}</p>
                                        <Row>
                                            {selectedService.serviceItems && selectedService.serviceItems.map(item => (
                                                <Col xs={6} md={4} lg={3} key={item._id} className="mb-4">
                                                    <div
                                                        onClick={() => handleItemClick(item)}
                                                        style={{
                                                            cursor: 'pointer',
                                                            border: '1px solid',
                                                            borderColor: chosenServices.some(chosenItem => chosenItem._id === item._id) ? 'green' : '#ccc',
                                                            borderRadius: '10px',
                                                            padding: '10px',
                                                        }}
                                                    >
                                                        <ServiceItem
                                                            imageUrl={`https://via.placeholder.com/150?text=${item.itemName}`}
                                                            mainText={item.itemName}
                                                            secondaryText={`$${item.cost}`}
                                                        />
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </>
                                ) : (
                                    <Alert variant="secondary">Please select a service from the list.</Alert>
                                )}
                            </Col>
                        </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="chosen">
                        <ChosenList chosenServices={chosenServices} onRequestService={handleRequestService} />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    );
};

export default Content;
