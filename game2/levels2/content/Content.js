"use strict";

module.exports=(function(){

	var defaults={
        "pick up":function(logicHelper){
            if (this.__data__.name){
                logicHelper.player.message("You can't pick up the "+this.__data__.name);
            }
		},
        "__data__":{
        
        }
	};

	//factory class
	function Content(logic, data, parent){
		parent=parent || defaults;
		var that=Object.create(parent);
        
        //copy `logic` into `content`
        for (var key in logic){
			if (logic.hasOwnProperty(key)){
				that[key]=logic[key];
			}
		}
        
        that.__data__=Object.create(parent.__data__);
            
        //copy `data` to `that.__data__`
        for (var key in data){
			if (data.hasOwnProperty(key)){
				that.__data__[key]=data[key];
			}
		}
        
        //no name was given
        if (typeof that.__data__.name==="undefined"){
            that.__data__.name="";
        }
        
		
		return that;
	}

    Content.makeParent=function(info){
        return require("./"+info.module) (info.options);
    }
    
	return Content;
}());

