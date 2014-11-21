"use strict";

var game = require('./game');

exports.makeGame=function makeGame(globalRoom, levels){
	if (!game.game){
		throw "a game already exists";
	}	
	game=new game.game(globalRoom, levels);
}

exports.Player=(function (){
	function Player(socket){
		this.socket=socket;
		//frigging windows telnet and its "send on keystroke"		
		this.input="";
		this.name="???";
	}
	Player.prototype={
		message:function(string){
			string=string || "";
			this.socket.write(string+"\r\n");
		},
		submitInput:function(){
			game.input(this, this.input);			
			this.input="";
		}
	}
	return Player;
}());
