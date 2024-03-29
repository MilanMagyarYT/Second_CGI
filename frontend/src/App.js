// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function App() {
  // State to hold sensor data
  const [sensorData, setSensorData] = useState(null);

  // Function to fetch sensor data
  const fetchSensorData = async () => {
    try {
      // Update the endpoint and machineID as needed
      const response = await fetch('http://localhost:8000/sensors/data/1');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSensorData(data);
    } catch (error) {
      console.error("Fetching sensor data failed", error);
    }
  };

  // Use useEffect to fetch data on component mount
  useEffect(() => {
    fetchSensorData();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <div className="App-content">
        {/* Display sensor data */}
        {sensorData && (
          <div>
            <h2>Sensor Data</h2>
            {/* Render your sensor data here */}
          </div>
        )}
        {/* Main content will go here */}
      </div>
    </div>
  );
}

export default App;
