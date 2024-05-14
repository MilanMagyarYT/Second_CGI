import React from 'react';
import './HomePage.css'; // Ensure you have some styles in HomePage.css

function HomePage() {
  return (
    <div className="home">
      <h1>Welcome to Our Sensor Dashboard</h1>
      {/*<p>
        This platform provides historical data visualization of various sensors. 
        Explore sensor performance, receive timely alerts, and make informed decisions with comprehensive 
        analytics. Navigate through the top bar to view different sensor modules and their detailed outputs.
  </p>*/}
      <p>
        Our sophisticated platform is designed for meticulous monitoring and analysis of sensor data across multiple parameters. Here, you can effortlessly search for any sensor to retrieve detailed information including its voltage, pressure, rotation, and vibration levels, all displayed alongside a confidence percentage to ensure data reliability. Our intuitive tables provide a gateway to more complex data visualizations; simply click on any table button to transition seamlessly to graphical representations of sensor performance over time.
      </p>
      <p>
        Navigate to our Alerts page to view all current and historical alerts, where you can stay ahead of potential failures with real-time error notifications and predictive alerts designed to foresee device malfunctions. Additionally, the Information page catalogues the age of all sensors, enabling effective maintenance scheduling and lifecycle management. Through our dashboard, empower your decision-making with advanced analytics and gain unparalleled insights into sensor health and operational status.
      </p>
      <p>
        Explore our comprehensive suite of tools through the top bar to delve into different sensor modules and unlock detailed outputs tailored to your operational needs.
      </p>
    </div>
  );
}

export default HomePage;
