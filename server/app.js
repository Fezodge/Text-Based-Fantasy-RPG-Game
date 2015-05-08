"use strict";

//Server crashes with multiple local clients (with uncommented thing below)

var TELNET_PORT=6283;


var fs = require("fs"),
    path = require("path");

var net = require('net'),
    Game = require(path.join(__dirname, './../game/engine/Game')),
    Player = require(path.join(__dirname, './../game/engine/Player')),
	Room = require(path.join(__dirname, './../game/engine/Room'));

var folders = fs.readdirSync(path.join(__dirname, "./../game/levels"));
var levelList=[];

for (var i=0; i<folders.length; i++){
    var levelFromFolder = fs.readdirSync(path.join(__dirname, "./../game/levels/"+folders[i]));
    levelFromFolder.forEach(function(v){
        levelList.push(v + folders[i]);
    }); 
}

var game=new Game(levelList);

var server = net.createServer(function (socket) {

    var player = new Player(socket, game);

    var connected=true;
    function disconnect() {
       if (connected){
           game.globalRoom.remove(player);
           game.disconnectPlayer(player);
           if (player.name!=="???"){
               game.globalRoom.message(player.name+" has left");
           }
           connected=false;
       }
    }
    socket.on('error', disconnect);
    socket.on('end', disconnect);

    checkSocketIp(socket);
    game.globalRoom.add(player);
    game.levelPack.levels[0].room.add(player);
	player.message('Welcome to the the game!');
    player.message('There are currently '+(game.globalRoom.size-1)+' other players online.');
    player.message(game.levelPack.levels[0].description);
    
	socket.on('data', function(data) {
		player.processInput(data);
	});

}).listen(TELNET_PORT);
server.maxConnections=50;

function checkSocketIp(socket){
    /*for (var i=0; i<game.globalRoom.players.length; i++){
        if (game.globalRoom.players[i].socket.remoteAddress===socket.remoteAddress){
            socket.end();
        }
    }*/
}
