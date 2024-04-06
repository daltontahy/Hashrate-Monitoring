// algostats.js

// algostats.js

const config = require('./config');
const Api = require('./api');

const api = new Api(config);

const getMiningStats = async () => {
    try {
        // Fetch server time
        await api.getTime();
        // Fetch mining algorithm statistics
        const res = await api.get('/main/api/v2/mining/algo/stats');
        const algorithms = res.algorithms;
        return algorithms;
    } catch (err) {
        // Handle errors
        if (err && err.response) {
            console.error(err.response.request.method, err.response.request.uri.href);
        }
        console.error('ERROR:', err.error || err);
        throw err; // Propagate the error
    }
};

module.exports = getMiningStats;
