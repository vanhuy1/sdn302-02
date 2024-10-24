import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navtab = () => {
    return (
        <Nav variant="tabs" defaultActiveKey="/staff">
            <Nav.Item>
                <Nav.Link
                    as={NavLink}
                    to="/manage/staff"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Staff
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    as={NavLink}
                    to="/manage/room"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Room
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    as={NavLink}
                    to="/manage/service"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Service
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    as={NavLink}
                    to="/manage/customer"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Customer
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default Navtab;
