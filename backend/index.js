const express = require('express');
const getMiningStats = require('./algostats');

const app = express();
const port = process.env.PORT || 3001; // Use the PORT environment variable if provided, otherwise default to 3001

app.get('/api/mining/algo/stats', async (req, res) => {
    try {
        const miningStats = await getMiningStats();
        res.json(miningStats);
    } catch (error) {
        console.error('Error fetching mining algorithm statistics:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app; // Export the Express app for use with Vercel
