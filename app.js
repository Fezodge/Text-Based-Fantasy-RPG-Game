"use strict";

var net = require('net'),
    Game = require('./src/Game'),
    Player = require('./src/Player'),
	Room = require('./src/Room'),
    Inputer = require('./src/Inputer');

var game=new Game(['level_one', 'level_two', 'level_three', 'level_four']);

var server = net.createServer(function (socket) {
    
    var player = new Player(socket);
    var inputer = new Inputer(game, player);
    
    function disconnect() {
       if (player){
           game.globalRoom.remove(player);
           game.disconnectPlayer(player);
           if (player.name!=="???"){
               game.globalRoom.message(player.name+" has left");
           }
           player=null;
       }
    }
    socket.on('error', disconnect);
    socket.on('end', disconnect);
    
    checkSocketIp(socket);
    game.globalRoom.add(player);
    game.levelPack.levels[0].room.add(player);
	player.message('Welcome to the the game!');
    player.message('There are currently '+(game.globalRoom.size-1)+' other players online.');
    player.message();
    player.message(game.levelPack.levels[0].description);
    
	socket.on('data', function(data) {
		inputer.add(data);
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