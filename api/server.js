const express = require('express');

const server = express();
server.use(express.json())

server.get('/', (req, res) => {
    res.send(`<h1>${process.env.MESSAGE}</h1>`)
})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error'
    })
  })

server.use('*', (req, res) => {
    res.status(404).json({
        message: `${req.method} to ${process.env.BASE_URL}${req.url} not found.`
    })
})

module.exports = server;