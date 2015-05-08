"use strict";

//Server crashes with multiple local clients (with uncommented thing below)

var TELNET_PORT=6283,
    STARTING_LEVEL_ID="dungeon-east";


var fs = require("fs"),
    path = require("path");

var net = require('net'),
    Game = require(path.join(__dirname, './../game/engine/Game')),
    Player = require(path.join(__dirname, './../game/engine/Player')),
	Room = require(path.join(__dirname, './../game/engine/Room'));

var folders = fs.readdirSync(path.join(__dirname, "./../game/levels"));
var levelList=[];

for (var i=0; i<folders.length; i++){
    if (folders[i]!=="content" && folders[i]!=="test-levels"){
        var levelFromFolder = fs.readdirSync(path.join(__dirname, "./../game/levels/"+folders[i]));
        levelFromFolder.forEach(function(v){
            levelList.push("/" + folders[i] + "/" + v);
        }); 
    }
}

var game=new Game(levelList);

for (var ii; ii<game.levelPack.levels.length; ii++){
    if (STARTING_LEVEL_ID===game.levelPack.levels[ii].id){
        var startingLevel=game.levelPack.levels[ii];
    }
}

 game.levelPack.levels[0].room.add(player);

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
    startingLevel.room.add(player);
	player.message('Welcome to the the game!');
    player.message('There are currently '+(game.globalRoom.size-1)+' other players online.');
    player.message(game.levelPack.levels[0].description);
    
	socket.on('data', function(data) {
		player.processInput(data);
	});

}).listen(TELNET_PORT);
server.maxConnections=50;

server.on("error", function(err){
   console.log("Error: "+err); 
});

function checkSocketIp(socket){
    /*for (var i=0; i<game.globalRoom.players.length; i++){
        if (game.globalRoom.players[i].socket.remoteAddress===socket.remoteAddress){
            socket.end();
        }
    }*/
}
