"use strict";

var Inputer = require('./Inputer'),
    Outputer = require('./Outputer');

module.exports=(function (){
	function Player(socket, game){
		this.outputer = new Outputer(socket);
		this.name = "???";
        this.inputer = new Inputer();
        this.game=game;
	}
	Player.prototype={
    	message:function(string){
          var input=this.inputer.inputBuffer;
          if (input.length){
            this.outputer.erase(input.length + 1);
          }
    	  this.outputer.writeLine(string);
          if (input){
            this.outputer.write(input);
          }
    	},
        processInput:function(text){
          this.inputer.processInput(text);
          if (this.inputer.isSubmited()){
            this.game.processInput(this, this.inputer.cleanAndDumpInput());
          }
        },
        kill:function(){
          this.outputer.close();
        }
	};
	return Player;
}());
