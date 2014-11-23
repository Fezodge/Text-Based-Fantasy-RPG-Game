"use strict";

var Game = require('./src/Game'),
    Player = require('./src/Player'),
	net = require('net'),
	Room = require('./src/Room');

var game=new Game(['level_one', 'level_two', 'level_three', 'level_four']);

var server = net.createServer(function (socket) {
    
    socket.on('error', function(){});
    checkSocketIp(socket);
    
	var player = new Player(socket, game);
    socket.on('end', function() {
	   game.globalRoom.remove(player);
	   game.disconnectPlayer(player);
       if (player.name!=="???"){
	       game.globalRoom.message(player.name+" has left");
       }
    });
    game.globalRoom.add(player);
    game.levelPack.levels[0].room.add(player);
	player.message('Welcome to the the game!');
    player.message('There are currently '+(game.globalRoom.size-1)+' other players online.');
    player.message();
    player.message(game.levelPack.levels[0].description);
    
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
server.maxConnections=50;

function checkSocketIp(socket){
    for (var i=0; i<game.globalRoom.players.length; i++){
        if (game.globalRoom.players[i].socket.remoteAddress===socket.remoteAddress){
            socket.end();
        }
    }
}