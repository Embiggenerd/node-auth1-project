const express = require('express')
const server = express()
const session = require('express-session')
const connectRedis = require('connect-redis')

const { apiRouter } = require('./router')

const RedisStore = connectRedis(session)

server.use(express.json())

server.use(
  session({
    // store: new RedisStore({}),
    name: 's', 
    secret: process.env.SECRET || 'secret',
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === 'production', 
    }, 
    httpOnly: true, 
    resave: false,
    saveUninitialized: false,
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