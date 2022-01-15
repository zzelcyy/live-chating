const fs = require('fs')
const express = require('express')
const socket = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socket(server)

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

app.get('/', (req, res) => {
    fs.readFile('./static/index.html', (err, data) => {
        if(err) {
            res.send('error')
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end()
        }
    })
})

io.sockets.on('connection', socket => {
    socket.on('newUser', name => {
        console.log(`${name} has been connected`)
        socket.name = name
        io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: `${name} has been connected`})
    })

    socket.on('message', data => {
        data.name = socket.name
        console.log(data)
        socket.broadcast.emit('update', data);
    })

    socket.on('disconnect', () => {
        const name = socket.name
        console.log(`${name} has been disconnected`)
        socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: `${name} has been disconnected`})
    })
})

server.listen(8080, () => {
    console.log('server on')
})
