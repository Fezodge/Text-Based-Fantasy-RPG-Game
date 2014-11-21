"use strict";

module.exports=(function(){

	var prototype={

	};

	//factory class
	function Content(logic, parent){
		parent=parent || prototype;
		var that=Object.create(parent);
		/*//if theres a parent with options		
		if (that.options){
			//copy options from parent
			that.options=that.options;
			//copy new options
			for (var i in options){
				if (options.hasOwnProperty(i)){
					that[i].options=options[i];
				}
			}
		}
		else{
			that.options=options;
		}*/
		for (var i in logic){
			if (logic.hasOwnProperty(i)){
				that[i]=logic[i];
			}
		}
		return that;
	}

	return Content;
}());

