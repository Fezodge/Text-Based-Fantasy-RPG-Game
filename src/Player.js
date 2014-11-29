"use strict";

module.exports=(function (){
	function Player(socket){
		this.socket=socket;
		this.name="???";
	}
	Player.prototype={
		message:function(string){
			string=string || "";
			this.socket.write(string+"\r\n");
		}
	}
	return Player;
}());
