"use strict";
//start by just copying this file, please don't leave any of the comments in your new item though
module.exports=function(api){//this functions gets recalled on the object whenever it is refreshed (ie a player quits game with object)
	this//refers to the item object
	this.name="key";//name in console, default is "something""
	this.type="exploding-key";//unique type (example if you wanted to make exploding key but have it still called key as name) default is `this.name`
	this.determiner="a";//example: you picked up [a] key! default is ""
	this.durability=10;//item specific property
	this.on("use", (function(){//item specific event, must be fired from a content file
		this.durability-=1;
	}).bind(this));//event callback functions must be bound to `this` if they use `this` inside them, otherwise `this` will refer to the event
		
	this.status=function(){//function that returns what the inventory printout should say about the this object, default is just the name
		return this.name +" - "+ this.durability;
	};
		
	//events can be added externally (ie in content files) and then fired from here using
	this.emit("event-name");
	//example
	this.on("use", (function(){//(multiple events w/ same name is ok)
		if (this.durability<=0){
			this.emit("broken");//deal with this event elsewhere	
		}
	}).bind(this));
};