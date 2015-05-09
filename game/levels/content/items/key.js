"use strict";

module.exports=function(api){
	this.name="key";
	this.type="key";
	this.determiner="a";
	this.durability=10;
	this.on("use", (function(data){
		this.durability-=data.wearAmount;
		if (this.durability<=0){
			this.emit("respawn", this);
		}
	}).bind(this));
	this.status=function(){
		return this.name +" - "+ this.durability;
	};
};
