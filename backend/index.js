const express = require ('express');
const app = express();
const cors = require('cors'); // Import the cors middleware
var MiningPoolHub = require('miningpoolhub');

// Set up options, including your API key
var options = {
  "api_key": "e00ddc7265057335529e77eb9978ac25b3b5cc427cbe852efcb569e34500e9ec"
};

app.use(cors());


var miningPoolHub = new MiningPoolHub(options);

// Endpoint to get user balances data
app.get('/user-balances', (req, res) => {
  // Retrieve user balances data using the miningpoolhub npm package
  miningPoolHub.getuserallbalances(function(err, data) {
    if (err) {
      console.error('Error fetching user balances:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Send user balances data as JSON response
      res.json(data);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
