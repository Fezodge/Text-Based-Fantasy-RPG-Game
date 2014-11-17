var net = require('./src/myNet');
 
var users = [];

var server = net.createServer(function (socket) {
    broadcast("A new player has joined.", users);
    users.push(socket);
	socket.write('Welcome to the the game!');
    socket.write('There are currently '+users.length+' players online.');
    
    socket.on('end', function endSocket() {
	   removeSocket(socket, users);
    })
}).listen(23);

function broadcast(message, sockets) {
    for (var i in sockets) {
        sockets[i].write(message);
    }
}

function removeSocket(socket, sockets) {
	var i = sockets.indexOf(socket);
	if (i>-1) {
		sockets.splice(i, 1);
	}
}