"use strict";

function getLevel(game, playerOrRoomId){
  if ('outputer' in Object(playerOrRoomId)){
    return getPlayersLevel(game, playerOrRoomId);
  }
  else{
    return getLevelById(game, playerOrRoomId);
  }
}

function getPlayersLevel(game, player){
  var levels=game.levelPack.levels;
	for (var i in levels){
	  if (levels[i].room.hasPlayer(player)){
			return levels[i];
		}
	}
	return false;
}

function getLevelById(game, id){
  var levels=game.levelPack.levels;
	for (var i=0; i<levels.length; i++){
		if (levels[i].id===id){
		  return levels[i];
	  }
	}
  return false;
}

getLevel.getPlayersLevel=getPlayersLevel;
getLevel.getLevelById=getLevelById;

module.exports=getLevel;
