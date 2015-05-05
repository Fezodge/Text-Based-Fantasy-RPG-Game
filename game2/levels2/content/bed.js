"use strict";

/*
	Bed
		-players can sit and sleep in bed

	options
		description
			-what bed looks like
		seats
			-how many people can sit/sleep in the bed
	    name
            -for input
	commands
		examine
            -examines the bed
        sleep
            -sleeps in bed

	parent
		chair
*/

var Content=require("./Content");

module.exports=function Bed(options){
    var logic={
        "examine":function(logicHelper){
            logicHelper.player.message(options.description);
        },
        "sleep":function(logicHelper){
            if (this.__data__.isSitting(logicHelper.player)){
                logicHelper.currentRoom.message(logicHelper.player.name+" falls asleep on the "+"bed");
            }
            else{
                logicHelper.player.message("You're not on the "+options.name);
            }
        }
    }

    var chair=Content.makeParent({
        "module": "chair",
        "options": {
            "name": options.name,
            "seats": options.seats
        }
    });
    
    var data={
        name:options.name
    };
    
	return Content(logic, data, chair);
}
