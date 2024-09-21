import React from 'react';
import './header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <img src='../images/logo-hotel.png' alt='Logo' className="logo" />
                <h1>Hotel Management</h1>
            </div>
            <nav className="header-nav">
                <ul>
                    <li><a href="#booking">Booking</a></li>
                    <li><a href="#service">Service</a></li>
                    <li><a href="#about-us">About Us</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <div className="header-buttons">
                <button className="sign-in-btn">Sign In</button>
                <button className="register-btn">Register</button>
            </div>
        </header>
    );
};

export default Header;
