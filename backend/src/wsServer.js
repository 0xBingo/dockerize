import zmq from 'zeromq';
import WebSocket, { WebSocketServer } from 'ws';

const sock = new zmq.Publisher();
await sock.bind('tcp://*:5555');

const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', ws => {
    ws.send(JSON.stringify({ system: 'Connected to WebSocket server' }));
});

setInterval(() => {
    const msg = JSON.stringify({ system: 'Heartbeat' });
    wss.clients.forEach(client => client.readyState === WebSocket.OPEN && client.send(msg));
}, 10000);
