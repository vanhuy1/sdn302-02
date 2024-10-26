import { Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const Navtab = () => {
    return (
        <Nav variant="tabs" >
            <Nav.Item>
                <LinkContainer to="/dash/manage/staff">
                    <Button variant="outline-primary" className="me-2">
                        Staff
                    </Button>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/dash/manage/viewroom">
                    <Button variant="outline-primary" className="me-2">
                        Room
                    </Button>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/dash/manage/service">
                    <Button variant="outline-primary" className="me-2">
                        Service
                    </Button>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/dash/manage/users">
                    <Button variant="outline-primary" className="me-2">
                        ManageCustomer
                    </Button>
                </LinkContainer>
            </Nav.Item>
        </Nav>
    );
};

export default Navtab;
