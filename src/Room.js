"use strict";

module.exports=(function (){
	function Room(){
		this.players=[];
	}
	Room.prototype={
		hasPlayer:function(player){
			for (var i=0; i<this.players.length; i++){
				if (this.players[i]===player){
					return true;
				}
				else{
					return false;
				}
			}
		},
		get size(){
			return this.players.length;
		},
		add:function(player){
			this.players.push(player);
		},
		message:function(string){
			for (var i = 0; i < this.players.length; i++){
				this.players[i].message(string)
			}
		},
		remove:function(player){
			var i=this.players.indexOf(player);
			if (i>-1){
				this.players.splice(i,1);
			}
		},
		isNameUsed:function(name){
			for (var i=0; i<this.players.length; i++){
				if (this.players[i].name===name){
					return true;
				}
				else{
					return false;
				}
			}
		}
	}
	return Room;
}());
