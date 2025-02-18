const http = require('http');

const server = http.createServer((req, res) => {
    res.end('hello');
});

server.listen(3000, () => {
    console.log('Things are running on port: 3000');
});
