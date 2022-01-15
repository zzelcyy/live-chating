const socket = io()

socket.on('connect', () => {
    let name = prompt('Welcome!', '')
    
    if(!name) {
        name = 'Unknown'
    }

    socket.emit('newUser', name)
})

socket.on('update', data => {
    let chat = document.getElementById('chat-log')
    let messageLog = document.createElement('div')
    let node = document.createTextNode(`${data.name}: ${data.message}`)

    messageLog.appendChild(node)
    chat.appendChild(messageLog)
})

const send = () => {
    let message = document.getElementById('chat-input').value

    console.log(message)

    let chat = document.getElementById('chat-log')
    let messageLog = document.createElement('div')
    let node = document.createTextNode(message)

    messageLog.appendChild(node)
    chat.appendChild(messageLog)

    socket.emit('message', {type: 'message', message: message})
    document.getElementById('chat-input').value = ''
}
