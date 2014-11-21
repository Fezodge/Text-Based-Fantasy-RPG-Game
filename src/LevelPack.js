"use strict";

var Room=require('./Room.js');

module.exports=(function(){
	//levels is an array of arrays first item is level module name second is a string id
	function LevelPack(levels){
		this.levels=[];		
		this.loadLevels(levels);
	}
	
	//this is created so that the same levels can be loaded multiple times since node caches modules, its a wrapper stored in an array
	function Level(module, id){
		this.contents=makeContent(module);
		this.room=new Room;
		this.module=module;
		this.id=id;
	}

	function makeContent(levelModule){
		var contentOptions=levelModule.contains;
		var content=[];
		for (var i in contentOptions){
			content.push(require("./levels/content/"+contentOptions[i].name) (contentOptions[i].options));
		}
		return content
	}

	LevelPack.prototype={
		loadLevels:function(levels){
			for (var i=0; i<levels.length; i++){
				this.levels.push(new Level(require("./levels/"+levels[i][0]),levels[i][1]));
			}
		}
	};

	return LevelPack;
	
}());
