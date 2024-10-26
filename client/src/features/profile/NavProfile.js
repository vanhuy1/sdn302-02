import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavProfile = () => {
    return (
        <Nav variant="tabs">
            <Nav.Item>
                <NavLink
                    to="/dash/profile"
                    className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}
                >
                    Profile
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink
                    to="/dash/profile/update"
                    className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}
                >
                    Edit Profile
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink
                    to="/dash/profile/change-password"
                    className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}
                >
                    Change Password
                </NavLink>
            </Nav.Item>
        </Nav>
    );
};

export default NavProfile;
