"use strict";

module.exports=(function (){
	function Inputer(){
		this.inputBuffer="";
	}
	Inputer.prototype={
        processInput:function(data){
            data=String(data);
            this.inputBuffer+=data;
        },
        isSubmited:function(){
          if (this.inputBuffer.indexOf("\n")!=-1 || this.inputBuffer.indexOf("\r")!=-1){
            return true;
          }
        },
        cleanAndDumpInput:function(){
          var cleanInput=this.inputBuffer.replace(/(\r\n|\n|\r)/gm,"");
          this.inputBuffer="";
          return cleanInput;
        }
	}
	return Inputer;
}());

