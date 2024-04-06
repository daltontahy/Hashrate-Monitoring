import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

function UserBalances() {
  // State to hold the mining algorithm statistics
  const [algorithmStats, setAlgorithmStats] = useState({});

  // Function to fetch mining algorithm statistics from the server
  const fetchAlgorithmStats = async () => {
    try {
      const response = await axios.get('https://api2.nicehash.com/main/api/v2/mining/algo/stats');
      setAlgorithmStats(response.data); // Set the fetched data to state
    } catch (error) {
      console.error('Error fetching algorithm stats:', error);
    }
  };

  // Fetch mining algorithm statistics when the component mounts
  useEffect(() => {
    fetchAlgorithmStats();
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <div>
      <h2>User Balances</h2>
      <ul>
        {/* Iterate over each algorithm in the algorithmStats object */}
        {Object.entries(algorithmStats).map(([algorithm, stats]) => (
          <li key={algorithm}>
            <strong>{algorithm}</strong>: 
            {/* Display the mining algorithm statistics */}
            <ul>
              <li>Unpaid: {stats.unpaid}</li>
              <li>Display Suffix: {stats.displaySuffix}</li>
              <li>Active: {stats.isActive ? 'Yes' : 'No'}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserBalances;
