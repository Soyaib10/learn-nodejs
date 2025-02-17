const http = require("http")
const {URL} = require("url")
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);


    res.writeHead(404, {'content-type': 'application/json'})
    res.end(JSON.stringify({error: 'Invalid route'}))
})

server.listen(PORT, () => {
    console.log(`Server running on port 3000`)
})