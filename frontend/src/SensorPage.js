import React, {useState, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import './SensorPage.css';
import SearchBar from './SearchBar'; // Import the Search Bar component


// Mock sensor data - make sure to use this data in your component
const mockSensorData = [
  { id: 1, date: '2024-01-01T00:00:00', volt: '3.7', rotate: '1500', pressure: '101.3', vibration: '0.5', prediction: 'Pass', confidence: '90%' },
  { id: 1, date: '2024-01-01T07:00:00', volt: '4.0', rotate: '1400', pressure: '100.0', vibration: '0.4', prediction: 'Pass', confidence: '92%' },
  { id: 1, date: '2024-01-01T20:00:00', volt: '3.9', rotate: '1450', pressure: '99.5', vibration: '0.45', prediction: 'Pass', confidence: '85%' },
  { id: 1, date: '2024-01-04T03:00:00', volt: '3.8', rotate: '1470', pressure: '100.8', vibration: '0.48', prediction: 'Pass', confidence: '88%' },
  { id: 1, date: '2024-01-04T09:00:00', volt: '4.1', rotate: '1520', pressure: '101.0', vibration: '0.5', prediction: 'Pass', confidence: '91%' },
  { id: 1, date: '2024-01-06T00:00:00', volt: '3.6', rotate: '1490', pressure: '100.9', vibration: '0.6', prediction: 'Pass', confidence: '93%' },
  { id: 1, date: '2024-01-07T00:00:00', volt: '3.5', rotate: '1505', pressure: '102.0', vibration: '0.52', prediction: 'Pass', confidence: '87%' },
  { id: 1, date: '2024-01-08T12:00:00', volt: '3.8', rotate: '1480', pressure: '101.4', vibration: '0.49', prediction: 'Pass', confidence: '90%' },
  { id: 1, date: '2024-01-08T22:00:00', volt: '3.7', rotate: '1500', pressure: '101.2', vibration: '0.51', prediction: 'Pass', confidence: '89%' },
  { id: 1, date: '2024-01-10T00:00:00', volt: '3.9', rotate: '1510', pressure: '101.6', vibration: '0.53', prediction: 'Pass', confidence: '94%' },
  { id: 1, date: '2024-01-11T00:00:00', volt: '4.0', rotate: '1495', pressure: '101.1', vibration: '0.55', prediction: 'Pass', confidence: '95%' },
  { id: 1, date: '2024-01-12T00:00:00', volt: '3.6', rotate: '1485', pressure: '100.6', vibration: '0.47', prediction: 'Pass', confidence: '90%' },
  { id: 1, date: '2024-01-13T02:00:00', volt: '3.7', rotate: '1500', pressure: '101.3', vibration: '0.5', prediction: 'Pass', confidence: '90%' },
  { id: 1, date: '2024-01-13T09:00:00', volt: '3.8', rotate: '1515', pressure: '102.1', vibration: '0.5', prediction: 'Pass', confidence: '88%' },
  { id: 1, date: '2024-01-13T10:00:00', volt: '3.7', rotate: '1500', pressure: '101.5', vibration: '0.6', prediction: 'Pass', confidence: '86%' },
  { id: 1, date: '2024-01-13T18:00:00', volt: '3.9', rotate: '1490', pressure: '101.3', vibration: '0.55', prediction: 'Pass', confidence: '87%' },
  { id: 1, date: '2024-01-17T00:00:00', volt: '4.2', rotate: '1480', pressure: '101.7', vibration: '0.57', prediction: 'Pass', confidence: '85%' },
  { id: 1, date: '2024-01-18T00:00:00', volt: '3.5', rotate: '1500', pressure: '100.5', vibration: '0.56', prediction: 'Pass', confidence: '82%' },
  { id: 1, date: '2024-01-19T00:00:00', volt: '3.7', rotate: '1510', pressure: '101.8', vibration: '0.5', prediction: 'Pass', confidence: '91%' },
  { id: 1, date: '2024-01-20T00:00:00', volt: '3.8', rotate: '1525', pressure: '101.0', vibration: '0.54', prediction: 'Pass', confidence: '93%' },
  { id: 1, date: '2024-01-21T00:00:00', volt: '3.7', rotate: '1500', pressure: '101.3', vibration: '0.5', prediction: 'Pass', confidence: '90%' },
  { id: 1, date: '2024-01-22T01:00:00', volt: '3.7', rotate: '1500', pressure: '101.3', vibration: '0.5', prediction: 'Pass', confidence: '90%' },
  { id: 1, date: '2024-01-22T09:00:00', volt: '3.7', rotate: '1500', pressure: '101.3', vibration: '0.5', prediction: 'Pass', confidence: '90%' },
  { id: 1, date: '2024-01-22T23:00:00', volt: '3.7', rotate: '1500', pressure: '101.3', vibration: '0.5', prediction: 'Pass', confidence: '90%' },
  { id: 1, date: '2024-01-22T21:00:00', volt: '3.7', rotate: '1500', pressure: '101.3', vibration: '0.5', prediction: 'Pass', confidence: '90%' },
  { id: 1, date: '2024-01-22T17:00:00', volt: '3.7', rotate: '1500', pressure: '101.3', vibration: '0.5', prediction: 'Pass', confidence: '90%' },
  // You can continue expanding this pattern for more entries if needed...
];



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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const navigate = useNavigate();
  const aggregatedData = useMemo(() => aggregateDataByDate(mockSensorData), []);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = mockSensorData.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(mockSensorData.length / itemsPerPage);

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
    navigate('/sensor-graph', { state: { data: aggregatedData } }); // Use navigate to change the route
  };
  return (
    <div className="sensor-page">
      <h1 className="page-title">Sensor List</h1>
      <SearchBar />
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
                <td>{sensor.id}</td>
                <td>{sensor.date}</td>
                <td>{sensor.volt}</td>
                <td>{sensor.rotate}</td>
                <td>{sensor.pressure}</td>
                <td>{sensor.vibration}</td>
                <td>{sensor.prediction}</td>
                <td>{sensor.confidence}</td>
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
