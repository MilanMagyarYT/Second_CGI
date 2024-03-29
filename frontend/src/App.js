// App.js
import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <div className="App-content">
        {/* Main content will go here */}
      </div>
    </div>
  );
}

export default App;
