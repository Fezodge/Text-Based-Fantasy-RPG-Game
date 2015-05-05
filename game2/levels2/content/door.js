"use strict";
/*
	Door
		For the player to move to other rooms

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
			logicHelper.currentRoom.message(logicHelper.player.name+" has gone to "+options.level);
            var room=logicHelper.getRoom(options.level);
            if (!room){console.log("room not found (door: "+options.doorName+")"); return true;}
			room.message(logicHelper.player.name+" has entered.");
			logicHelper.movePlayerToRoom(options.level);
            if (options.actionText){
                logicHelper.player.message(options.actionText);
            }
            logicHelper.describeRoom();
		},
		"examine":function(logicHelper){
			logicHelper.player.message("A "+(options.type || "door")+" that leads to the "+options.level+".");
		}
	};	

    var data={
        name:options.name
    };
    
	return Content(logic, data);
}
