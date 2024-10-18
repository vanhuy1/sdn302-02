// NavbarComponent.js
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'

const DASH_REGEX = /^\/dash(\/)?$/

const Header = () => {

    const { username, status } = useAuth();

    const { isManager } = useAuth()

    const navigate = useNavigate()
    const pathname = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    let dashClass = null
    if (!DASH_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <PulseLoader color={"#FFF"} />
    } else {
        buttonContent = (
            <>

                {logoutButton}
            </>
        )
    }
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
                        style={{ marginLeft: '30px' }}
                    />{' '}
                </Navbar.Brand>

                <h2 style={{ marginLeft: '100px' }}> CODER HOTEL </h2>

                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" style={{ marginRight: '30px' }}>
                    <Nav className="me-5">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/services">Services</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                        <Button variant="outline-primary" className="me-2">
                            <Link to="/dash/userList" style={{ textDecoration: 'none' }}> ManageCustomer</Link>
                        </Button>
                    </Nav>

                    {/* <Button variant="outline-primary" className="me-2">Register</Button>
                    <Button variant="primary">
                        Login
                    </Button> */}
                    <nav className="">
                        <p>Current User: {username}</p>
                        <p>Status: {status}</p>
                        {buttonContent}
                    </nav>
                </Navbar.Collapse>
            </Navbar>

        </>
    );
};

export default Header;
