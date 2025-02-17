const https = require('https');
const { loadChecks, saveChecks } = require('./fileUtils');

const monitorWebsites = () => {
    const checks = loadChecks();
    checks.forEach((check) => {
        https.get(check.url, (res) => {
            check.status = res.statusCode === 200 ? 'UP' : 'DOWN';
            check.lastChecked = new Date().toISOString();
            saveChecks(checks);
        }).on('error', () => {
            check.status = 'DOWN';
            check.lastChecked = new Date().toISOString();
            saveChecks(checks);
        });
    });
};

setInterval(monitorWebsites, 5000); 

module.exports = monitorWebsites;
