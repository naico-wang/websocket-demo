const http = require('http');
const WebSocketServer = require('websocket').server;

const server = http.createServer();
server.listen(9898);

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('connection', function(ws, req) {
  console.log(ws, req)
})

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
      console.log('Received Message:', message.utf8Data);
      wsServer.broadcast(message.utf8Data)
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.', reasonCode);
    });
});
