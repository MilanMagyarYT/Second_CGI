//Navbar.js
/*import React from 'react';
import './Navbar.css';
import logo from './CGI_Logo.png'; // Import the logo image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faBell, faInfoCircle, faGears } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={logo} className="logo-image" alt="CGI Logo" />
                <span className="navbar-title">Maintenance Dashboard</span>
            </div>
            <div className="user-info">

                
                <a href="#alerts"><FontAwesomeIcon icon={faBell} /> </a>
                <span className="user-name">Milan Magyar</span>
            </div>
        </nav>
    );
};
export default Navbar;*/

import React from 'react';
import './Navbar.css';
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
