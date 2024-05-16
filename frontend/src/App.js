// App.js
import React from 'react';
import './App.css';
import Navbar from './Navbar';
//import Sidebar from './Sidebar';
import HomePage from './HomePage';
import SensorPage from './SensorPage';
import SensorGraph from './SensorGraph'; 
import { MsalAuthenticationTemplate, useIsAuthenticated } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "./authConfig";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import from react-router-dom

function App() {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
      return (
          <MsalAuthenticationTemplate interactionType={InteractionType.Redirect} authenticationRequest={loginRequest}>
              <div>Loading...</div>
          </MsalAuthenticationTemplate>
      );
  }
  return (
    <Router> {/* Wrap your application in a Router component */}
      <div className="App">
        <Navbar />
        {/*<Sidebar />*/}
        <div className="App-content">
          <Routes> {/* Define your routes within a Switch component */}
            <Route exact path="/" element={<HomePage />} /> {/* Route for the HomePage */}
            <Route path="/sensors" element={<SensorPage />} /> {/* Route for the SensorPage */}
            <Route path="/sensor-graph" element={<SensorGraph />} /> {/* New route for the Sensor Graph */}
            {/* Define other routes as needed */}
          </Routes>
        </div>
      </div> 
    </Router>
  );
}

export default App;
