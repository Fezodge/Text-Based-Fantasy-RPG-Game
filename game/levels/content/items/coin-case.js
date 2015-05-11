"use strict";

module.exports=function(api){
	this.name="holder"; //this is called holder because I thought we might want other things like this; it would stop use having to re-write it every time!
	this.type="coin-case";
	this.determiner="your";
	this.broken=false;
	this.value=0;
	
	this.on("addMoney", (function(){
		if (Player.recieveMoney){
			this.value += recievedAmount;
		}
	}).bind(this));
	
	this.on("loseMoney", (function(){
		if (Player.spendMoney){
			this.value -= spentAmount;
		}
	}).bind(this));
};