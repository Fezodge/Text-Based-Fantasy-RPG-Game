"use strict";

var Room=require('./Room.js');

module.exports=(function(){
	//levels is an array of arrays first item is level module name second is a string id
	function LevelPack(levels){
		this.levels=[];		
		this.loadLevels(levels);
	}
	
	//this is created so that the same levels can be loaded multiple times since node caches modules, its a wrapper stored in an array
	function Level(module){
		this.contents=makeContent(module);
		this.room=new Room;
		this.module=module;
		this.id=module.id;
        Object.defineProperty(this, 'description', {
           get:function(){
               return this.module.description;
           } 
        });
	}

	function makeContent(levelModule){
		var contentOptions=levelModule.contains;
		var content=[];
		for (var i in contentOptions){
			content.push(require("./levels/content/"+contentOptions[i].module) (contentOptions[i].options));
		}
		return content
	}

	LevelPack.prototype={
		loadLevels:function(levels){
			for (var i=0; i<levels.length; i++){
                var levelModule=require("./levels/"+levels[i]);
				this.levels.push(new Level(levelModule));
			}
		}
	};

	return LevelPack;
	
}());
