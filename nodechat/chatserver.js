var net = require('net');
var port = 8888;

var chatServer = net.createServer();
var clientList = [];

// Set up the chat server.
chatServer.on('connection', function(client) {
  client.name = client.remoteAddress + ':' + client.remotePort;
  console.log(client.name + ' connected.');
  var date = new Date();
  client.write('=============================\n');
  client.write('Welcome to NodeChat\nServer time is ' + date + '\nYou are ' + client.name + '\n');
  client.write('=============================\n');
  clientList.push(client);

  // Broadcast messages when received.
  client.on('data', function(data) {
    broadcast(data, client);
  });
  
  // Remove the client from the list on disconnect.
  client.on('end', function() {
    clientList.splice(clientList.indexOf(client), 1);
    console.log(client.name + ' disconnected.');
  });
});

// Broadcasts a message to all clients except the sender.
function broadcast(message, client) {
  var cleanup = [];
  for (var i=0; i < clientList.length; i += 1) {
    if (client !== clientList[i]) {
      if (clientList[i].writable) {
        clientList[i].write(client.name + ': ' + message);
      } else {
        cleanup.push(clientList[i]);
        clientList[i].destroy();
      };
      
    };
  };
  
  // Remove dead clients out of the list.
  for (var i = 0; i < cleanup.length; i += 1) {
    clientList.splice(clientList.indexOf(cleanup[i]), 1)
  };
};

chatServer.listen(port);
console.log('Nodechat is running on port ' + port);
