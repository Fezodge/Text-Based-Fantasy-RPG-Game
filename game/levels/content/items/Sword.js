"use strict";

module.exports=function(api){
	this
	this.name="sword";
	this.type="short-sword";
	this.determiner="a";
	this.durability=20;
	this.damage=3;
	this.on("use", (function(){
		this.durability-=1;
	}).bind(this));
	
	this.status=function(){
		return this.name +" - "+ this.durability;
	};
		
	
	this.emit("event-name");
	
	this.damage+=Player.damage;
	this.on("use", (function(){
		if (this.durability<=0){
			this.emit("broken");	
		}
	}).bind(this));
};