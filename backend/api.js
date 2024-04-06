const CryptoJS = require("crypto-js");
const qs = require('qs');

function createNonce() {
    var s = '', length = 32;
    do {
        s += Math.random().toString(36).substr(2);
    } while (s.length < length);
    s = s.substr(0, length);
    return s;
}

const getAuthHeader = async (apiKey, apiSecret, time, nonce, organizationId = '', request = {}) => {
    const fetch = await import('node-fetch');

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, apiSecret);

    hmac.update(apiKey);
    hmac.update("\0");
    hmac.update(time);
    hmac.update("\0");
    hmac.update(nonce);
    hmac.update("\0");
    hmac.update("\0");
    if (organizationId) hmac.update(organizationId);
    hmac.update("\0");
    hmac.update("\0");
    hmac.update(request.method);
    hmac.update("\0");
    hmac.update(request.path);
    hmac.update("\0");
    if (request.query) hmac.update(typeof request.query == 'object' ? qs.stringify(request.query) : request.query);
    if (request.body) {
        hmac.update("\0");
        hmac.update(typeof request.body == 'object' ? JSON.stringify(request.body) : request.body);
    }

    return apiKey + ':' + hmac.finalize().toString(CryptoJS.enc.Hex);
};

class Api {

    constructor({ locale, apiHost, apiKey, apiSecret, orgId }) {
        this.locale = locale || 'en';
        this.host = apiHost;
        this.key = apiKey;
        this.secret = apiSecret;
        this.org = orgId;
        this.localTimeDiff = null;
    }

    async getTime() {
        const fetch = await import('node-fetch');
        return fetch.default(this.host + '/api/v2/time',{})
            .then(res => res.json())
            .then(res => {
                this.localTimeDiff = res.serverTime - (+new Date());
                this.time = res.serverTime;
                return res;
            });
    }

    async apiCall(method, path, { query, body, time } = {}) {
        const fetch = await import('node-fetch');

        if (this.localTimeDiff === null) {
            return Promise.reject(new Error('Get server time first .getTime()'));
        }

        // query in path
        var [pathOnly, pathQuery] = path.split('?');
        if (pathQuery) query = { ...qs.parse(pathQuery), ...query };

        const nonce = createNonce();
        const timestamp = (time || (+new Date() + this.localTimeDiff)).toString();
        return fetch.default(`${this.host}${pathOnly}?${qs.stringify(query)}`, {
            method: method,
            headers: {
                "X-Request-Id": nonce,
                "X-User-Agent": "NHNodeClient",
                "X-Time": timestamp,
                "X-Nonce": nonce,
                "X-User-Lang": this.locale,
                "X-Organization-Id": this.org,
                "X-Auth": await getAuthHeader(
                    this.key,
                    this.secret,
                    timestamp,
                    nonce,
                    this.org,
                    {
                        method,
                        path: pathOnly,
                        query,
                        body,
                    },
                ),
            },
            body,
        })
            .then(res => res.json())
    }

    async get(path, options) {
        return this.apiCall('GET', path, options)
    }

    async post(path, options) {
        return this.apiCall('POST', path, options)
    }

    async put(path, options) {
        return this.apiCall('PUT', path, options)
    }

    async delete(path, options) {
        return this.apiCall('DELETE', path, options)
    }

}

module.exports = Api;
