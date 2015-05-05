"use strict";

/*
	Talker
		something for players to talk to
	options
		name
			-name that appears in command
	    dialogue
            -what it says
	commands
		talk
			-reads options.dialogue to player
	parent
		none
*/

var Content=require("./Content");

module.exports=function Enemy(options){
    var data={};
	return Content(logic, data);
};

var logic={
	"talk":function(logicHelper){
		logicHelper.player.message(options.dialogue);
	}
};
