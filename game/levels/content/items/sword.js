"use strict";

module.exports=function(api){
	this.name="sword";
	this.type="short-sword";
	this.determiner="a";
	this.durability=20;
	this.broken=false;
	this.damage=3;
	
	this.on("use", (function(wearAmount){
		if (this.durability<=0){
			if (!this.broken){
				this.emit("broken");
			}	
		}
		else{
			this.durability-=wearAmount||1;//if wearAmount isn't defined (or is 0) subtract 1
		}
	}).bind(this));
	
	this.status=function(){
		return this.name +" - "+ this.durability;
	};
	
	//////this.damage+=Player.damage;
	
	//I ommited the previous line because this function is called only when the sword is first created,
	//If you want code to be run at a later time wrap it in an event like
	this.on("attack", (function(target){
		target.hitPoints+=this.damage;
	}).bind(this));
	//target would be whoevers getting attacked, ie. the player or a monster
};