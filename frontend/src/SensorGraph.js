import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './SensorGraph.css';

var degreesSign = "\u00B0";

function SensorGraph() {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data; // Assuming data is passed via navigation state
    
    // Function to navigate back
    const goBack = () => {
      navigate(-1); // This takes the user back to the previous page
    };

    // Helper function to get units based on the metric name
    function getUnits(metric) {
      switch (metric) {
        case 'volt': return 'V';
        case 'rotate': return `${degreesSign}`;
        case 'pressure': return 'Pa';
        case 'vibration': return 'mm/s';
        default: return '';
      }
    }

     // Render a message if data is empty or not provided
     if (!data || data.length === 0) {
      return (
        <div className="sensor-graph-container">
          <button onClick={goBack} className="go-back-button" autoFocus> &lt; Go Back</button>
          <h1 className="page-title">Sensor Graph</h1>
          <p>No data available to display the graph.</p>
        </div>
      );
    }
    
    return (
      <div className="sensor-graph-container">
        <button onClick={goBack} className="go-back-button" autoFocus> Go Back</button>
        <h1 className="page-title">Sensor Graph</h1>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" orientation="left" stroke="#cf1632"/>
            <YAxis yAxisId="right" orientation="right" stroke="#5236ab"/>
            <YAxis yAxisId="pressure" orientation="right" stroke="#9E83F5"/>
            <YAxis yAxisId="vibration" orientation="right" stroke="#ed6479"/>
            <Tooltip 
              formatter={(value, name) => [value.toFixed(3), `${name} (${getUnits(name)})`]} 
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend formatter={name => `${name} (${getUnits(name)})`} />
            <Line yAxisId="left" type="monotone" dataKey="volt" stroke="#cf1632" activeDot={{ r: 8 }}/>
            <Line yAxisId="right" type="monotone" dataKey="rotate" stroke="#5236ab" activeDot={{ r: 8 }}/>
            <Line yAxisId="pressure" type="monotone" dataKey="pressure" stroke="#9E83F5" activeDot={{ r: 8 }}/>
            <Line yAxisId="vibration" type="monotone" dataKey="vibration" stroke="#ed6479" activeDot={{ r: 8 }}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
}

export default SensorGraph;
