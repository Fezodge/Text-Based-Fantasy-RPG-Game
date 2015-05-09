"use strict";

var EventEmitter = require("events").EventEmitter,
	ItemLogicHelper = require("./ItemLogicHelper");	

var uniqueId=0;

module.exports=function makeNewItem(callback){
	var newItem=Object.create(new EventEmitter);
	
	newItem.on("refresh", function(){
		callback.call(newItem);
	});	
	
	callback.call(newItem, new ItemLogicHelper());
	
	newItem.determiner=newItem.determiner||"";
	newItem.name=newItem.name||"something";
	newItem.status=newItem.status||function defaultStatus(){
		return newItem.name;
	};
	newItem.type=newItem.type||newItem.name;
	
	return newItem;
};

