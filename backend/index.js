// index.js

const express = require('express');
const getMiningStats = require('./algostats');

const app = express();
const port = 3001; // Specify the port you want to run your backend on

app.get('/api/mining/algo/stats', async (req, res) => {
    try {
        const miningStats = await getMiningStats();
        res.json(miningStats);
    } catch (error) {
        console.error('Error fetching mining algorithm statistics:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
