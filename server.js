const express = require('express')
const server = express()
const session = require('express-session')

const { apiRouter } = require('./router')

server.use(express.json())

server.use(
    session({
        name: 's',
        secret: process.env.SECRET || 'secret',
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: process.env.NODE_ENV === 'production',
        },
        httpOnly: true,
        resave: false,
        saveUninitialized: false, // When we change session by putting userID on it, only then will user have a session
    })
);

server.use('/api', apiRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(err.httpStatusCode || 500).json({
        message: err.message
    })
})

module.exports = server