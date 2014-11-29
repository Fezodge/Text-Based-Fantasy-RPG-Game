"use strict";

module.exports=(function (){
	function Inputer(game, player){	
		this.__input="";
        this.__game=game;
        this.__player=player;
	}
	Inputer.prototype={
        add:function(data){
            data=String(data);
            this.__input+=data;
            if (this.__input.indexOf("\n")!=-1 || this.__input.indexOf("\r")!=-1){
                //clean input
                this.__input=this.__input.replace(/(\r\n|\n|\r)/gm,"");
                //submit
                this.__game.input(this.__player, this.__input);			
			    this.__input="";
            }
        }
	}
	return Inputer;
}());
