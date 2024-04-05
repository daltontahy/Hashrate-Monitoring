const express = require ('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to Express!');
});

app.get('/hash-rates', (req, res) => {
    res.send('Hash rates endpoint');
});

app.get('/temperatures', (req, res) => {
        res.send('Temperatures endpoint');
});

app.get('/hash-rates', (req, res) => {
    res.send('Hash rates endpoint');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is listening on port ${PORT}');
});