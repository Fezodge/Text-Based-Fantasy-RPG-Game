"use strict";

/*
	Chair
		used for players to sit in

	options
		type
			-what type of chair
				-sofa_comfy
				-normal chair (default)
		seats
			-how many people can sit in the chair
				-default 2
	
	commands
		sit
			-checks if theres an empty seat and 

	parent
		none
*/

var Content=require("./Content");

module.exports=function Door(options){

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
				currentRoom.message(logicHelper.player.name+" has sat down.");
			}
			else{
				logicHelper.player.message("There's no room.");
			}
		},
		"examine":function(logicHelper){
			switch (options.type){
				case "sofa_comfy":
					logicHelper.player.message("A super comfy sofa.");
					break;
				default:
					logicHelper.player.message("A chair.");
			}
		}
	};	

    //decide name of chair
    switch(options.type){
        case "sofa_comfy":
            var name="sofa";
            break;
        default:
            var name="chair";
    }
    
	return Content(logic, name);
}
