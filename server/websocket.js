import WebSock from "../client/src/WebSock";

const ws = require('ws')

const PORT = 5000
const wss = new ws.Server({
    port: 5000,
}, () => console.log(`Server started on port: ${PORT}...` ))

wss.on('connection', function connection (ws) {
    ws.on('message', message => {
        message = JSON.parse(message)

        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break
            case 'connection':
                broadcastMessage(message)
                break
        }
    })
})

function broadcastMessage (message) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message))
        }
    })
}