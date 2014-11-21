"use strict";

/*
	Template

	options
		doNotUse
			-boolean
	
	commands
		command
			-does shit -hiyaah

	parent
		none
*/
var Content=require("./Content");

module.exports=function Template(options){

	var logic={
		"command":function(logicHelper){
			//do shit -hiyaah
		}
	};	
	
	var parent=new Content(options.parentOptions);

	return Content(logic, "template", parent);
}
