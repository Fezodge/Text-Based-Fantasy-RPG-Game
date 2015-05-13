"use strict";

/*
	Chair
		used for players to sit in

	options
		name
			-name that appears in command
		seats
			-how many people can sit in the chair
	    description
            -what the chair looks like
	commands
		sit
			-checks if theres an empty seat and 
        examine
            -reads option.description to player
	parent
		none
*/

var Content=require("./Content");

module.exports=function Chair(options){

	var playersSitting=[];
    
	var logic={
		"sit":function(logicHelper){
			
			var currentRoom=logicHelper.currentRoom;
			
            var alreadySitting=false;
            
            //update playersSitting
			for (var i in playersSitting){
				if (currentRoom!==logicHelper.getRoom(playersSitting[i])){
					playersSitting.splice(i,1);
				}
                if (playersSitting[i]===logicHelper.player){
                    alreadySitting=true;
                }
			}
			//sit if theres room
            if (alreadySitting){
                logicHelper.player.message("Your already sitting.");
            }
			else if (playersSitting.length<options.seats){
				playersSitting.push(logicHelper.player);
				currentRoom.message(logicHelper.player.name+" sat down on the "+options.name+".");
			}
			else{
				logicHelper.player.message("There's no room.");
			}
		},
        "get off":function(logicHelper){
            //update playersSitting
            for (var i in playersSitting){
                if (playersSitting[i]===logicHelper.player){
                    playersSitting.splice(i,1);
                    logicHelper.currentRoom.message(logicHelper.player.name+" got off the "+options.name+".");
                    return;
                }
            }
		},
		"examine":function(logicHelper){
			logicHelper.player.message(options.description);
		}
	};	

    var data={
        name:options.name,
        isSitting:function(player){
            for (var i in playersSitting){
                if (playersSitting[i]===player){
                    return true;
                }
            }
            return false;
        }
    };
    
	return Content(logic, data);
}
