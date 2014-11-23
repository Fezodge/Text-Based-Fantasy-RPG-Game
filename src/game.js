"use strict";

var LevelPack=require("./LevelPack")
var Room=require('./Room');

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
				getPlayersLevel(this, player).room.message(player.name+": \""+string.slice(4)+"\"");
			}

            else if (string==="examine"){
				player.message(getPlayersLevel(this, player).description);
			}
            
			else if (string==="quit"){
				player.message('Thanks for Playing!');
				player.socket.end();
			}

			else {
				processExternalCommand(this, player, raw);
			}
		},
		disconnectPlayer:function(player){
			var playerInARoom=true;
			while (playerInARoom) {
				var level=getPlayersLevel(this, player);
							
				if (!level){
					playerInARoom=false;
				}
				else{
					level.room.remove(player);
				}
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
		return false;
	}

	function getLevelById(game, id){
		var levels=game.levelPack.levels;
		for (var i in levels){
			if (levels[i].id===id){
				return levels[i];
			}
		}
		return false;
	}

    function getLevel(game, playerOrRoomId){
        //if its a player
        if ('socket' in Object(playerOrRoomId)){//cast as object because for some dumb reason the in op doesnt for you
            return getPlayersLevel(game, playerOrRoomId);
        }
        //if its a name
        else{
            return getLevelById(game, playerOrRoomId);
        }
    }
    
	var LogicHelper=(function(){
		function LogicHelper(game, player, input, room){
			this.game=game;
			this.player=player;
			this.currentRoom=room;
		}

        
		LogicHelper.prototype={
			//if player is given, player is moved to that players room
            getRoom:function(playerOrRoomId){
                return getLevel(this.game, playerOrRoomId).room;
            },
			//if player is given, player is moved to that players room
            movePlayerToRoom:function(playerOrRoomId){
   				var room=this.getRoom(playerOrRoomId);
				this.currentRoom.remove(this.player);
				room.add(this.player);
            },
            describeRoom:function(){ 
                this.player.message(getLevel(this.game, this.player).description);
            }
		};

		return LogicHelper;
	}());

    
    function contains(big, test){
        return (big.indexOf(test)>-1);
    }
    
	//commands imported from content from level pack
	function processExternalCommand(game, player, input){
        
        //__data__ is an invalid command
        //content has a __data__ property
        if (startsWith(input,'__data__')) {return;}
        
		var currentLevel=getPlayersLevel(game, player);
		for (var content in currentLevel.contents){
            //dont check hasownprop allow for inheritance
			for (var command in currentLevel.contents[content]){
				if (startsWith(input,command+" ")){
                    var contentInstance=currentLevel.contents[content];
                    if (contains(input.slice(command.length), contentInstance.__data__.name)){
                       //`this` in following function must be content instance
					   contentInstance[command](new LogicHelper(game, player, input, currentLevel.room));
					   return;		
                    }	
				}
			}
		}
	}

	return Game;
}());
