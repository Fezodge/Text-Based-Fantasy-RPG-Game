"use strict";

var Inputer = require('./Inputer'),
    Outputer = require('./Outputer'),
    Inventory = require('./Inventory');

module.exports=(function (){
	function Player(socket, game){
		this.outputer = new Outputer(socket);
		this.name = "???";
        this.inputer = new Inputer();
        this.game=game;
        this.inventory = new Inventory();
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
          this.inventory.refreshEverything();
          this.inventory.returnEverything();
        }
	};
	return Player;
}());
