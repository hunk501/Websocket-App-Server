const fs = require('fs');
const WebSocketServer = require('ws').Server;
const WebsocketStream = require('websocket-stream');

const wss = new WebSocketServer({ port: 8989 });
//wss.binaryType = 'blob';

wss.on('connection', (socket) => {
  //socket.send("Hello from server");

  socket.on('message', (msg) => {
    console.log('Msg: ', msg.toString());
    // send reply
    setTimeout(() => {
      //socket.send(`Server ${new Date().toISOString()}`);
      const streams = WebsocketStream(socket);
      const rs = fs.createReadStream("../files/image1.png");
      rs.on('data', () => console.log('Reading file'));
      //rs.setEncoding('base64');
      rs.pipe(streams);
    }, 3000);
  });
  socket.on('close', () => console.log('Client disconnected'));
});
wss.on("close", () => console.log('Client disconnected'));