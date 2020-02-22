const express = require('express')
const server = express()

const { apiRouter } = require('./router')

server.use(express.json())

server.use('/api', apiRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(err.httpStatusCode || 500).json({
        message: err.message
    })
})

module.exports = server