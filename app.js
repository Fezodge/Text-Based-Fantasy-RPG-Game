"use strict";

var Game = require('./src/Game'),
    Player = require('./src/Player'),
	net = require('net'),
	Room = require('./src/Room');

var globalRoom = new Room;

var game=new Game(globalRoom, [['level_one', 'entrance']]);

var server = net.createServer(function (socket) {
	var player = new Player(socket, game);    
	globalRoom.message("A new player has joined.");
    globalRoom.add(player);
    game.levelPack.levels[0].room.add(player);
	player.message('Welcome to the the game!');
    player.message('There are currently '+globalRoom.size+' players online.');
    

	//events
    socket.on('end', function() {
	   globalRoom.remove(player);
	   game.disconnectPlayer(player);
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
