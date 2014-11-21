"use strict";

/*
	Door
		For the player to move to other rooms

	options
		level
			-where the door leads to
	
	commands
		use
			-moves player to level (option)
		examine
			-tells player where the door leads to

	parent
		none
*/

var Content=require("./Content");

module.exports=function Door(options){
	var logic={
		"use":function(logicHelper){
			logicHelper.getCurrentRoom().message(logicHelper.player.name+" has gone to "+options.level);
			logicHelper.getRoom(options.level).message(logicHelper.player.name+" has entered.");
			logicHelper.movePlayerToRoom(options.level);
		},
		"examine":function(logicHelper){
			logicHelper.player.message("A door that leads to "+options.level+".");
		}
	};	

	return Content(logic, "door");
}
