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

server.listen(8080, () => {
    console.log('server on')
})
