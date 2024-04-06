import './App.css';

import React from 'react';
import UserBalances from './components/UserBalances'; // Import UserBalances component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Mining Pool Website</h1>
        <UserBalances /> {/* Render the UserBalances component */}
      </header>
    </div>
  );
}

export default App;
