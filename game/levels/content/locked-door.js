"use strict";
/*
	Locked Door
		For the player to move to other rooms, requires a key in inventory

	options
		level
			-where the door leads to
			-Player instance or roomId
	    name
            -input must contain this
        actionText
            -text displayed when door is used (optional)
        type
            -ie. a `hole` that leads to...
		wearAmount
			-how much it wears key down by
		verb
			-default locked, eg. sealed, closed, etc
	commands
		use
			-moves player to level (option)
		examine
			-tells player where the door leads to

	parent
		door
*/

var Content=require("./Content");

module.exports=function LockedDoor(options){
	
	var door=Content.makeParent({
		"module":"door",
		"options":{
			"level":options.level,
			"name":options.name,
			"type":options.type,
			"action-text":options.actionText
		}
	});
	
	return Content(logic, options, door);
}

var logic={
	"use":function(logicHelper){
		if (logicHelper.useKey(this.__data__.wearAmount)){
			this.__proto__.use(logicHelper);
		}
		else{
			logicHelper.player.message("The "+this.__data__.type+" is "+this.__data__.verb+".");
		}
	},
	"examine":function(logicHelper){
		logicHelper.player.message("A "+(this.__data__.type || "door")+" that leads to the "+this.__data__.level+".");
	}
};	