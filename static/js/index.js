const socket = io()

socket.on('connect', function() {
    const input = document.getElementById('chat-input')
    input.value = 'connected'
})

const send = () => {
    const message = document.getElementById('chat-input').value
    socket.emit('send', {msg: message})
    message = ''
}
