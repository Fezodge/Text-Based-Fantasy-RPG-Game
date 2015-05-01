"use strict";

var ansi = require('ansi');

module.exports=(function(){
  function Outputer(socket, lineLength){
    this.socket=socket;
    this.cursor=ansi(socket);
    this.cursor.red().bg.grey();
    this.lineLength=lineLength || 80;
  }

  Outputer.prototype={
    write:function(text, line){//TODO add max to write (1000000 char)?
			text = text || "";
      if (text.length>=this.lineLength){
        var pre = text.slice(0,this.lineLength);
        var post = text.slice(this.lineLength);
        
        if (pre.indexOf(" ")>-1){        
          var preSpaces = pre.split(" ");
          preSpaces.filter(spaceFilter);
          var preCutOffLength = preSpaces[preSpaces.length-1].length;
          var preCutOff = pre.slice(pre.length-preCutOffLength);
          
          pre = pre.slice(0, pre.length-preCutOffLength);
          post = preCutOff + post;
        }
        
        this.cursor.write(pre+"\r\n");
        this.write(post, line);
      }
      else{
        this.cursor.write(text+(line?"\r\n":""));
      }
    },
    writeLine:function(text){
      this.write(text, true);
    },
    erase:function(numOfChar){
      this.write(Array(numOfChar).join("\b"));
    },
    close:function(){
      this.cursor.end();
    }
  };

  return Outputer;

}());

function spaceFilter(value){
  return Boolean(value);
}