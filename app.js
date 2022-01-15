const express = require('express')
const socket = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socket(server)

app.get('/', (req, res) => {
    console.log('connected: "/"')
    res.send('Hello')
})

server.listen(8080, () => {
    console.log('server on')
})
