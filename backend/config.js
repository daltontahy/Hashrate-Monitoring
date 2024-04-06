// config.js
require('dotenv').config();

module.exports = {
    apiHost: 'https://api2.nicehash.com', // use https://api2.nicehash.com for production
    apiKey: process.env.API_KEY, // get it here: https://test.nicehash.com/my/settings/keys or https://www.nicehash.com/my/settings/keys
    apiSecret: process.env.API_SECRET, // get it here: https://test.nicehash.com/my/settings/keys or https://www.nicehash.com/my/settings/keys
    orgId: process.env.ORG_ID, // get it here: https://test.nicehash.com/my/organization or https://www.nicehash.com/my/organization
};
