
import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import logo from './CGI_Logo.png'; // Import the logo image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    // Function to handle notification button click
    const handleNotificationClick = () => {
        console.log("Notifications button clicked");
        // Here you would handle the logic to show notifications
    };

    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={logo} className="logo-image" alt="CGI Logo" />
                <span className="navbar-title">Maintenance Dashboard</span>
            </div>
            <div className="nav-links">
                {/* Navigation Links */}
                <NavLink to="/" exact> Home</NavLink>
                <NavLink to="/sensors"> Sensors</NavLink>
                <NavLink to="/alerts"> Alerts</NavLink>
                <NavLink to="/information"> Information</NavLink>
                {/* Add more navigation links as needed */}
            </div>
            <div className="user-info">
                {/* Notification button */}
                <button onClick={handleNotificationClick} className="notification-button">
                    <FontAwesomeIcon icon={faBell} />
                </button>
                <span className="user-name">Milan Magyar</span>
            </div>
        </nav>
    );
};

export default Navbar;
