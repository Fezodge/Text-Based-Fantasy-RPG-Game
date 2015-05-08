"use strict";

var path=require("path");

module.exports=(function (){
	function Inventory(){
		this.items=[];
	}
	Inventory.prototype={
    	addNew:function(itemName){
			this.items.push({
				item:makeItem(itemName),
				owner:"this"
			});
		},
		add:function(item, owner){
			item.owner=owner;
			this.items.push(item);
		},
		lendItemTo:function(otherInventory, itemIndex){
			itemIndex=itemIndex||0;
			otherInventory.add(this.items.splice(itemIndex,1), this);
		},
		returnItem:function(itemIndex){
			var owner=this.items[itemIndex].owner;
			if (owner!=="this"){
				owner.add(this.items.splice(itemIndex,1), "this");
			}
		},
		returnEverything:function(){
			for (var i=0; i<this.items.length; i++){
				this.returnItem(i);
			}
		}
	};
	return Inventory;
}());

function makeItem(itemName){
	return new (require(path.join(__dirname, "./../levels/content/items/", itemName)));
}