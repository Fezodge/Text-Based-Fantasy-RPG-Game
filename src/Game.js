"use strict";

var LevelPack = require("./LevelPack"),
    Room = require('./Room'),
    LogicHelper = require("./LogicHelper"),
    getLevel = require("./getLevel");

module.exports=(function(){
	function Game(levels){
		this.globalRoom=new Room;
		this.levelPack=new LevelPack(levels);
	}
	function startsWith(string, starts){
		return string.slice(0, starts.length)===starts;
	}
	Game.prototype={
		//handle internal commands
		processInput:function(player, string){
			var raw=string;
			string=string.toLowerCase();

			if (player.name==="???" && startsWith(string, "name ")){
				if (this.globalRoom.isNameUsed(string.slice(5)) || string.slice(5)===""){
					player.message("\""+string.slice(5)+"\" has already been used.");
				}
				else{
					player.name=raw.slice(5);
					player.message("Your name has been set.");
					this.globalRoom.message(player.name+" introduces themselves to everyone.");
				}
			}

			else if (startsWith(string, "say ")){
				getLevel.getPlayersLevel(this, player).room.message(player.name+": \""+string.slice(4)+"\"");
			}

      else if (string==="examine"){
				player.message(getLevel.getPlayersLevel(this, player).description);
			}

			else if (string==="quit"){
				player.message('Thanks for Playing!');
				player.kill();
			}

			else {
				processExternalCommand(this, player, raw);
			}
		},
		disconnectPlayer:function(player){
			var playerInARoom=true;
			while (playerInARoom) {
				var level=getLevel.getPlayersLevel(this, player);

				if (!level){
					playerInARoom=false;
				}
				else{
					level.room.remove(player);
				}
			}
		}
	}

    function contains(big, test){
        return (big.indexOf(test)>-1);
    }

	function processExternalCommand(game, player, input){

    if (startsWith(input,'__data__')) {return;}

		var currentLevel=getLevel.getPlayersLevel(game, player);

		for (var content in currentLevel.contents){
			for (var command in currentLevel.contents[content]){
			  if (startsWith(input,command+" ")){
          var contentInstance=currentLevel.contents[content];
          if (contains(input.slice(command.length), contentInstance.__data__.name)){
            contentInstance[command](new LogicHelper(game, player, input, currentLevel.room));
					  return;
          }
				}
			}
		}


	}

	return Game;
}());
