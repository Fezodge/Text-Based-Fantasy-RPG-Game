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
		canRespawn
		    - if false respawned items are just removed
	commands
		search
			- get item if there is one
	parent
		none
*/

var Content=require("./Content"),
	Inventory=require(require("path").join(__dirname, "./../../engine/Inventory"));

module.exports=function Spawn(options){
	
	if (typeof options.canRespawn==="undefined"){
		options.canRespawn=true;
	}
	
    options.inventory=new Inventory(options.canRespawn);
	
	for (var i=0; i<options.quantity; i++){
		options.inventory.addNew(options.item);
	}
	
	return Content(logic, options);
};

var logic={
	"search":function(logicHelper){
		var inventory=this.__data__.inventory;
		if (inventory.items.length>0){
			var item=inventory.items[0].item;
			inventory.lendItemTo(logicHelper.player.inventory);
			logicHelper.player.message("You found "+item.determiner+" "+item.name);
		}
		else{
			logicHelper.player.message("There's nothing.");
		}
	}
};	