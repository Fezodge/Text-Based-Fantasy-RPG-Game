"use strict";

/*
	Template

	options
		doNotUse
			-boolean
	   name
            -name in input
	commands
		command
			-does shit -hiyaah

	parent
		none
*/
var Content=require("./Content");

module.exports=function Template(options){

    //Do not define `__data__` in logic, it will be overwritten with data
    //`this` is content instance
	var logic={
		"command":function(logicHelper){
			//do shit -hiyaah
            
            //recursive
            this.command(logicHelper);
		}
	};	
	
	var parent=Content.makeParent({
        "module": "chair",
        "options": {
            //dont provide description if your overiding examine
            name: "template",
            "seats": 1
        }
    });
    
    //holds name in commands and data for children to access
    //stored as content.__data__
    //__data__ objects inherit from their parent's __data__ object
    var data={
        name:options.name,
        
        //already defined through inheritence
        playersSitting:parent.__data__.playersSitting;
    };
    
	return Content(logic, data, parent);
}
