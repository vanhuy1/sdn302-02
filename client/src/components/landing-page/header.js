import React from "react";
import { Navbar, Nav, Button, Image } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/images/logo192.png";
import useAuth from "../../hooks/useAuth";
// import PulseLoader from "react-spinners/PulseLoader";

// const DASH_REGEX = /^\/dash(\/)?$/;

const Header = () => {
  const { username, status, isManager } = useAuth();

  const navigate = useNavigate();
  const pathname = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  //   const logoutButton = (
  //     <button className="icon-button" title="Logout" onClick={sendLogout}>
  //       <FontAwesomeIcon icon={faRightFromBracket} />
  //     </button>
  //   );

  //   let dashClass = null;
  //   if (!DASH_REGEX.test(pathname)) {
  //     dashClass = "dash-header__container--small";
  //   }

  //   const errClass = isError ? "errmsg" : "offscreen";

  //   let buttonContent;
  //   if (isLoading) {
  //     buttonContent = <PulseLoader color={"#FFF"} />;
  //   } else {
  //     buttonContent = <>{logoutButton}</>;
  //   }
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">
          <img
            src="https://img.freepik.com/premium-vector/hotel-icon-logo-vector-design-template_827767-3569.jpg"
            alt="Logo"
            width="50"
            height="50"
            className="d-inline-block align-top"
            style={{ marginLeft: "30px" }}
          />{" "}
        </Navbar.Brand>

        <h2 style={{ marginLeft: "100px" }}> CODER HOTEL </h2>

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end"
          style={{ marginRight: "30px" }}
        >
          <Nav className="me-5">
            <Nav.Link href="/dash">Home</Nav.Link>
            <Nav.Link href="/dash/about">About</Nav.Link>
            <Nav.Link href="/dash/services">Services</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>

          </Nav>
          {username ? (
            <>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <p className="m-0 me-2 fw-bolder">{username}</p>
                <div className="dropdown">
                  <Image
                    id="avatar"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    src={Logo}
                    roundedCircle
                    className="border dropdown-toggle"
                    width="40"
                    height="40"
                    alt="User Avatar"
                  />
                  <ul className="dropdown-menu" aria-labelledby="avatar">
                    <li>
                      <a className="dropdown-item" href="/dash/profile">
                        Profile
                      </a>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={sendLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </>
          ) : (
            <>
              <Button variant="outline-primary" className="me-2">
                <Link to="/register" style={{ textDecoration: "none" }}>
                  {" "}
                  Register
                </Link>
              </Button>
              <Button variant="outline-primary">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  {" "}
                  Login
                </Link>
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
