"use strict";

module.exports=function(api){
	this.name="holder"; //Good idea :) best take out anything that refers to coins then to make it more generic
	this.type="simple-holder";
	this.determiner="your";
	this.value=0;
	
	this.on("configure", (function(config){//a way to name it wallet/purse/etc
		this.name=config.name||this.name;
	}).bind(this));
	
	this.on("add", (function(amount){//instead of remove just send in a negative amount
		this.value+=amount;
	}).bind(this));
	
	this.status=function(){
		return this.name +" - "+ this.value;
	};
};