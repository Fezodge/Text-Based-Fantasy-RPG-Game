"use strict";
//TODO convert this.items to a Set
//TODO returnItem won't work in destroy/respawn if item isn't in its owners inventory
var path=require("path");

module.exports=(function (){
	function Inventory(canRespawn){
		this.items=[];
		this.canRespawn=canRespawn;
	}
	Inventory.prototype={
    	addNew:function(itemName){
			var item=makeItem(itemName);
			if (this.canRespawn){
				item.on("respawn", respawn.bind(this));
			}
			else{
				item.on("respawn", destroy.bind(this));
			}
			item={
				item:item,
				owner:"this"
			};
			this.items.push(item);
			return item;
		},
		add:function(item, owner){
			item.owner=owner;
			this.items.push(item);
		},
		remove:function(item){
			
		},
		lendItemTo:function(otherInventory, itemIndex){
			itemIndex=itemIndex||0;
			otherInventory.add(this.items.splice(itemIndex,1)[0], this);
		},
		returnItem:function(itemIndex){
			var owner=this.items[itemIndex].owner;
			if (owner!=="this"){
				owner.add(this.items.splice(itemIndex,1)[0], "this");
			}
		},
		returnEverything:function(){
			for (var i=0; i<this.items.length; i++){
				this.returnItem(i);
			}
		},
		refreshItem:function(itemIndex){
			this.items[itemIndex].item.emit("refresh");
		},
		refreshEverything:function(){
			for (var i=0; i<this.items.length; i++){
				this.refreshItem(i);
			}
		},
		has:function(itemType){
			return Boolean(this.use(itemType));
		},
		use:function(itemType){
			for (var i=0; i<this.items.length; i++){
				if (this.items[i].item.type===itemType){
					return this.items[i].item;
				}
			}
		},
		printStatusTo:function(player){
			for (var i=0; i<this.items.length; i++){
				player.message(this.items[i].item.status());
			}
		}
	};
	return Inventory;
}());

var Item = require(path.join(__dirname, "./../levels/content/items/Item"));

function makeItem(itemName){
	return Item(require(path.join(__dirname, "./../levels/content/items/", itemName)));
}

function respawn(item){
	item.emit("refresh");
	//this.returnItem(item);
	console.log(item.type+" could not be returned when respawned, please see TODO");
}

function destroy(item){
	//this.returnItem(item);
	this.remove(item);
	console.log(item.type+" could not be removed please see TODO");
}