import React, { useState, useEffect } from 'react';

function UserBalances() {
  // Define state to hold user balances data and loading state
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user balances data from backend API
  useEffect(() => {
    // Define the endpoint URL of your backend API
    const apiUrl = 'http://localhost:3000/user-balances';

    // Fetch user balances data from the API
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user balances');
        }
        return response.json(); // Parse response body as JSON
      })
      .then(data => {
        console.log('User balances data:', data); // Log user balances data
        const balancesArray = data.getuserallbalances.data;
        setBalances(balancesArray); // Set user balances data in state
        setLoading(false); // Update loading state
      })
      .catch(error => {
        console.error('Error fetching user balances:', error);
        setError(error.message); // Set error message in state
        setLoading(false); // Update loading state
      });
  }, []); // Run effect only once on component mount

  // Render loading state while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if there was an error fetching data
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render balances data
  return (
    <div>
      <h2>User Balances</h2>
      {balances.length === 0 ? (
        <div>No balances available</div>
      ) : (
        <ul>
          {balances.map((balance, index) => (
            <li key={index}>{balance.coin}: {balance.balance}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserBalances;
