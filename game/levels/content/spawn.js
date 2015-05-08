"use strict";
/*
	Spawn
		For the player to move to other rooms

	options
	    name
			- name of the object to search. ie search [name]
		quantity
			- amount of items that can be taken before spawn is depleted, Infinity acceptable
		item
			- item file from ./items (.js extension optional)
	commands
		search
			- get item if there is one
	parent
		none
*/

var Content=require("./Content"),
	path=require("path");

module.exports=function Spawn(options){
	
    
	return Content(logic, options);
};

var logic={
	"search":function(logicHelper){
		var a=this;
		debugger;
	}
};	