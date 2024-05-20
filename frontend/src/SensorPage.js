import React, { useState, useMemo, useEffect } from 'react'; // Added useEffect import
import { useNavigate } from 'react-router-dom';
import './SensorPage.css';
import SearchBar from './SearchBar'; // Import the Search Bar component
import { ENDPOINTS } from './api';
import axios from 'axios';


// Function to fetch data from the backend
const fetchData = async (endpoint) => {
  const response = await fetch(endpoint);
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};


function aggregateDataByDate(data) {
  const groupedData = data.reduce((acc, item) => {
    const date = item.date.split('T')[0]; // Extract just the date part
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return Object.keys(groupedData).map(date => {
    const dailyItems = groupedData[date];
    const averages = dailyItems.reduce((avg, item) => {
      avg.volt = (avg.volt || 0) + parseFloat(item.volt);
      avg.rotate = (avg.rotate || 0) + parseFloat(item.rotate);
      avg.pressure = (avg.pressure || 0) + parseFloat(item.pressure);
      avg.vibration = (avg.vibration || 0) + parseFloat(item.vibration);
      return avg;
    }, {});

    const itemCount = dailyItems.length;
    return {
      date,
      volt: averages.volt / itemCount,
      rotate: averages.rotate / itemCount,
      pressure: averages.pressure / itemCount,
      vibration: averages.vibration / itemCount
    };
  });
}

function SensorPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
        try {
            setLoading(true);
            const telemetryData = await fetchData(ENDPOINTS.TELEMETRY_ALL);
            setData(telemetryData);
            setFilteredData(telemetryData); // Initially display all data
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    getData();
  }, []);

  const handleSearch = (id) => {
    const filtered = data.filter(sensor => sensor.machineID === id);
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when new search is done
  };

  const aggregatedData = useMemo(() => aggregateDataByDate(filteredData), [filteredData]);


  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = aggregatedData.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(aggregatedData.length / itemsPerPage);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page with the new item count
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToSensorGraph = () => {
    navigate('/sensor-graph', { state: { data: currentItems } }); // Use navigate to change the route
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="sensor-page">
      <h1 className="page-title">Sensor List</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="sensor-list">
        <table className="sensor-table">
        <thead>
            <tr>
              <th colSpan="8">
                <div className="table-header-content">
                  <h2 className="sensor-summary-title">Sensor Summary</h2>
                  <button className="create-graph-button" onClick={goToSensorGraph} autoFocus>Create Graph</button>
                </div>
              </th>
            </tr>
            <tr class="table-row-gradient"></tr>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Volt</th>
              <th>Rotate</th>
              <th>Pressure</th>
              <th>Vibration</th>
              <th>Prediction</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {/* Here you will map over your mock sensor data to create table rows */}
            {currentItems.map((sensor, index) => (
            <tr key={index} >
                <td>{sensor.machineID}</td>
                <td>{sensor.datetime}</td>
                <td>{sensor.volt.toFixed(2)}</td>
                <td>{sensor.rotate.toFixed(2)}</td>
                <td>{sensor.pressure.toFixed(2)}</td>
                <td>{sensor.vibration.toFixed(2)}</td>
                <td>Pass</td>
                <td>90%</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
          <tr>
            <td colSpan="8" className="sensor-table-footer">
              {/* Footer content */}
              Items per page:  
              <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <button onClick={goToPreviousPage} disabled={currentPage === 1}>{'<'}</button> 
              Page {currentPage} of {totalPages}
              <button onClick={goToNextPage} disabled={currentPage === totalPages}>{'>'}</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
  );
}

export default SensorPage;
