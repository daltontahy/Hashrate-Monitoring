const express = require ('express');
const app = express();

var MiningPoolHub = require('miningpoolhub');

// Set up options, including your API key
var options = {
  "api_key": "e00ddc7265057335529e77eb9978ac25b3b5cc427cbe852efcb569e34500e9ec"
};

var miningPoolHub = new MiningPoolHub(options);

// Example: Get user's balances
miningPoolHub.getuserallbalances(function(err, data) {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('User balances:', data);
  }
});


app.get('/', (req, res) => {
  res.send('Welcome to Express!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is listening on port ${PORT}');
});