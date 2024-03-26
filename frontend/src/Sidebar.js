import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faInfoCircle, faGears } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <div className="sidebar">
      <a href="#home"><FontAwesomeIcon icon={faHome} /> Home</a>
      <a href="#sensors"><FontAwesomeIcon icon={faGears} /> Sensors</a>
      <a href="#alerts"><FontAwesomeIcon icon={faBell} /> Alerts</a>
      <a href="#information"><FontAwesomeIcon icon={faInfoCircle} /> Information</a>
    </div>
  );
}

export default Sidebar;
