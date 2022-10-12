const fs = require('fs');
const WebSocketServer = require('ws').Server;
const WebsocketStream = require('websocket-stream');
const { Readable } = require('stream');
const { Base64Encode, Base64Decode } = require('base64-stream');

const wss = new WebSocketServer({ port: 8989 });
//wss.binaryType = 'blob';

wss.on('connection', (socket) => {
  //socket.send("Hello from server");

  socket.on('message', (msg) => {
    console.log('Msg: Incoming');
    // send reply
    // setTimeout(() => {
    //   //socket.send(`Server ${new Date().toISOString()}`);
    //   const streams = WebsocketStream(socket);
    //   const rs = fs.createReadStream("./files/image2.png");
    //   rs.on('data', () => console.log('Reading file'));
    //   //rs.setEncoding('base64');
    //   rs.pipe(streams);
    // }, 3000);

    //socket.send(msg);
    if(msg.toString().length > 0) {
      const streams = WebsocketStream(socket);
      const r = Readable.from(msg);
      r.pipe(new Base64Decode() ).pipe(streams);
    }

  });
  socket.on('close', () => console.log('Client disconnected'));
});
wss.on("close", () => console.log('Client disconnected'));