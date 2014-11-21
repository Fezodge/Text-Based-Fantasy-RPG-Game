"use strict";

module.exports=(function (){
	function Player(socket, game){
		this.socket=socket;
		//frigging windows telnet and its "send on keystroke"		
		this.input="";
		this.name="???";
        this.game=game;
	}
	Player.prototype={
		message:function(string){
			string=string || "";
			this.socket.write(string+"\r\n");
		},
		submitInput:function(){
			this.game.input(this, this.input);			
			this.input="";
		}
	}
	return Player;
}());
