"use strict";

module.exports=function(api){
	this
	this.name="sword";
	this.type="short-sword";
	this.determiner="a";
	this.durability=20;
	this.damage=3;
	this.on("use", (function(){//item specific event, must be fired from a content file
		this.durability-=1;
	}).bind(this));//event callback functions must be bound to `this` if they use `this` inside them, otherwise `this` will refer to the event
		
	this.status=function(){//function that returns what the inventory printout should say about the this object, default is just the name
		return this.name +" - "+ this.durability;
	};
		
	//events can be added externally (ie in content files) and then fired from here using
	this.emit("event-name");
	//example
	this.damage+=Player.damage;
	this.on("use", (function(){//(multiple events w/ same name is ok)
		if (this.durability<=0){
			this.emit("broken");//deal with this event elsewhere	
		}
	}).bind(this));
};