import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faInfoCircle, faGears } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom'; 

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink to="/"><FontAwesomeIcon icon={faHome} /> Home</NavLink> 
      <NavLink to="/sensors"><FontAwesomeIcon icon={faGears} /> Sensors</NavLink>
      <NavLink to="/alerts"><FontAwesomeIcon icon={faBell} /> Alerts</NavLink>
      <NavLink to="/information"><FontAwesomeIcon icon={faInfoCircle} /> Information</NavLink>
    </div>
  );
}

export default Sidebar;
