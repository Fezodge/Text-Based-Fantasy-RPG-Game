"use strict";

var LevelPack=require("./LevelPack")

exports.game=(function(){
	function Game(globalRoom, levels){
		this.globalRoom=globalRoom;
		this.levelPack=new LevelPack(levels);
	}
	function startsWith(string, starts){
		return string.slice(0, starts.length)===starts;
	}
	Game.prototype={
		//handle internal commands
		input:function(player, string){
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
				this.globalRoom.message(player.name+": \""+string.slice(4)+"\"");
			}

			else if (string==="quit"){
				player.message('Thanks for Playing!');
				player.socket.end();
			}

			else {
				processExternalCommand(this, player, raw);
			}
		}
	}

	function getPlayersLevel(game, player){
		var levels=game.levelPack.levels;
		for (var i in levels){
			if (levels[i].room.hasPlayer(player)){
				return levels[i];
			}
		}
	}

	var LogicHelper=(function(){//TODO finish this class
		function LogicHelper(game, player, input, room){
			this.player=player;
			this.currentRoom=room;//TODO change chair and door and template from getCurrentRoom() (depracated)
		}

		LogicHelper.prototype={

		};

		return LogicHelper;
	}());

	//commands imported from content from level pack
	function processExternalCommand(game, player, input){
		currentLevel=getPlayersLevel(player);
		for (var content in currentLevel.contents){
			for (var command in currentLevel.contents[content]){
				//dont check hasownprop allow for inheritance		
		
				if (startsWith(input,command)){
					var action=currentLevel.contents[content][command];
					action(new LogicHelper(game, player, input, currentLevel.room));				
					return;			
				}
			}
		}
	}

	return Game;
}());