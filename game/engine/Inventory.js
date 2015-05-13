"use strict";
//TODO convert this.items to a Set
//TODO returnItem won't work in destroy/respawn if item isn't in its owners inventory
var path=require("path");

module.exports=(function (){
	function Inventory(canRespawn){
		this.slots=new Set;
		this.canRespawn=canRespawn;
	}
	Inventory.prototype={
    	addNewSlot:function(itemType){
			var item=makeItem(itemType);
			if (this.canRespawn){
				item.on("respawn", respawn.bind(this));
			}
			else{
				item.on("respawn", destroy.bind(this));
			}
			var slot=new Slot(item, "this");
			this.slots.add(item);
			return slot;
		},
		addSlot:function(slot, owner){
			item.owner=owner||slot.owner;
			this.items.add(item);
			return item;
		},
		removeSlot:function(slot){
			this.items.delete(item);
			return slot;
		},
		giveBackEverything:function(){
			for (var item of this.items){
				this.returnItem(item);
			}
		},
		refreshItem:function(item){
			item.emit("refresh");
		},
		refreshEverything:function(){
			for (var item of this.items){
				this.refreshItem(item);
			}
		},
		hasItemType:function(itemType){
			return Boolean(this.getItemFromType(itemType));
		},
		getItemFromType:function(itemType){
			for (var item of this.items){
				if (item.item.type===itemType){
					return item.item;
				}
			}
		},
		findInventoryItemByItem:function(item){
			for (var inventoryItem of this.items){
				if (invetoryItem.item===item){
					return inventoryItem;
				}
			}	
		},
		printStatusTo:function(messenger){
			for (var slot of this.slots){
				messenger.message(slot.item.status());
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
	this.giveBackItem(findInventoryItemByItem(item));
}

function destroy(slot){
	slot.returnToOwner(???);
	this.remove(item);
}

var Slot=(function(){
	function Slot(item, owner){
		this.item=item;
		this.ownerInventory=owner;
		this.currentInventory=null;
	}
	Slot.prototype={
		lendTo:function(otherInventory, currentInventory){
			if (this.owner.items.delete(this)){
				otherInventory.add(this);
			}
			else if (currentInventory && currentInventory.items.delete(this)){
				otherInventory.add(this);
			}
			else{
				throw "Slow.prototype.lendTo Must have current inventory, if item isn't in owner";
			}
		},
		returnToOwner:function(currentInventory){
			var owner=this.owner;
			if (owner!=="this"){
				owner.add(currentInventory.items.delete(this), "this");
			}
		},
	};
	return Slot;
}());

