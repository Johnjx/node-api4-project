const express = require('express');
const userModel = require('./users/usersModel');
const cors = require('cors')

const server = express();
server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.send(`<h1>${process.env.MESSAGE || 'Hello World!!'}</h1>`)
})

server.get('/api/users', (req, res, next) => {
    userModel.findAll()
    .then(userArr => res.send(userArr))
    .catch(next)
})

server.post('/api/register', (req, res, next) => {
    if (!req.body.name || !req.body.sigil) {
        next({ status: 400, message: 'You must provide a name and sigil!'});
        return;
    }
    userModel.insert(req.body)
    .then(newUser => {
        res.status(201).send({
            name: newUser.name,
            sigil: newUser.sigil
        })
    })
    .catch(next)
})

server.post('/api/login', (req, res, next) => {
    if (!req.body.name || !req.body.sigil) {
        next({ status: 400, message: 'You must provide a name and sigil to enter!'});
        return;
    }
    const user = {
        name: req.body.name,
        sigil: req.body.sigil
    }
    userModel.findByInfo(user)
    .then(user => {
        if (user == null) {
            next({ status: 404, message: 'User does not exist!'});
            return;
        }
        res.send(`<h2>Welcome, ${user.name}!, of House ${user.sigil.toUpperCase()}</h2>`)
    })
    .catch(next)
})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error'
    })
  })

server.use('*', (req, res) => {
    res.status(404).json({
        message: `${req.method} to ${process.env.BASE_URL || 'http://...'}${req.url} not found.`
    })
})

module.exports = server;