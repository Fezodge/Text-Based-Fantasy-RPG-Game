"use strict";

/*
	Enemy
		something for players to fight

	options
		name
			-name that appears in command
		hitPoints
			-how many hits it can take before dieing
		alive
			-true/false whether its alive (default true) *optional
	    description
            -what the enemy looks like
		dialogue (optional)
			-what it says with talk command
	commands
		attack
			-checks if theres an empty seat and 
        examine
            -reads option.description to player
	parent
		talker (if theres dialogue)
*/

var Content=require("./Content");

module.exports=function Enemy(options){

	if (typeof options.alive==="undefined"){
		options.alive=true;
	}

    var data={
        name:options.name,
		alive:options.alive,
		hitPoints:options.hitPoints,
		description:options.description
    };
    if (options.dialogue){
		var talker=Content.makeParent({
	        "module": "talker",
	        "options": {
	            "name": options.name,
	            "dialogue": options.dialogue
	        }
	    });
	}
	
	return Content(logic, data, talker);
};

var logic={
	"attack":function(logicHelper){
		if (this.__data__.alive){
			if (--this.__data__.hitPoints<=0){
				this.__data__.alive=false;
				logicHelper.player.message("The "+this.__data__.name+" dies.");
			}
			else{
				logicHelper.player.message("The "+this.__data__.name+" takes a hit! It lost "+Player.damage+"health! It now has "+this.__data__.hitPoints+"hit points remaining!");
			}
		}
		else{
			logicHelper.player.message("The "+this.__data__.name+" is already dead.");
		}
	},
	"examine":function(logicHelper){
		logicHelper.player.message(this.__data__.description);
	}
};	