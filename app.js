"use strict";

var engine = require('./src/engine'),
	net = require('net'),
	Room = require('./src/Room');

var globalRoom = new Room;

engine.makeGame(globalRoom, ['level_one']);

var server = net.createServer(function (socket) {
	var player = new engine.Player(socket);    
	globalRoom.message("A new player has joined.");
    globalRoom.add(player);
	player.message('Welcome to the the game!');
    player.message('There are currently '+globalRoom.size+' players online.');
    

	//events
    socket.on('end', function() {
	   globalRoom.remove(socket);
	   globalRoom.message(player.name+" has left");
    });
	socket.on('error', function(){});
	socket.on('data', function(data) {
		data=String(data);
		player.input+=data;
		if (data.indexOf("\n")!=-1){
			//clean input
			player.input=player.input.replace(/(\r\n|\n|\r)/gm,"")			
			player.submitInput();
		}
	})

}).listen(23);
