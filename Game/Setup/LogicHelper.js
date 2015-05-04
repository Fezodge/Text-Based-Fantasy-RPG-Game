"use strict";

var getLevel = require("./getLevel");

module.exports=(function(){
		function LogicHelper(game, player, input, room){
			this.game=game;
			this.player=player;
            this.input=input;
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
