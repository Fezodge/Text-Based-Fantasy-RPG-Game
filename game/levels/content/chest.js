"use strict";
/*
	Chest
		For the player to move to other rooms

	options
	    name
			- name of the object to search. ie search [name]
		quantity
			- amount of items that can be taken before spawn is depleted, Infinity acceptable
		item
			- item file from ./items (.js extension optional)
		canRespawn
		    - if false respawned items are just removed
		wearAmount
			-how much it wears key down by
		verb
			-default locked, eg. sealed, closed, etc
	commands
		open
			- get item if there is one, unlocking it If you can
		search
			- ''
	parent
		spawn
*/

var Content=require("./Content");

module.exports=function Spawn(options){
	
	var spawn=Content.makeParent({
		"module":"spawn",
		"options":options
	});
	
	return Content(logic, options, spawn);
};

var logic={
	"open":open,
	"search":open
};	

function open(logicHelper){
	if (logicHelper.useKey(this.__data__.wearAmount)){
		this.__proto__.search(logicHelper);
	}
	else{
		logicHelper.player.message("This "+this.__data__.name+" is "+this.__data__.verb+".");
	}
}