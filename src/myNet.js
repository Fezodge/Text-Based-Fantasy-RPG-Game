var net=require('net');

myNet=Object.create(net);

myNet.createServer=function myNetCreateServer(scope){
    return net.createServer(function(socket){
        var specialSocket=Object.create(socket);
        //add carriage return and new line automatically to every socket write call
        specialSocket.write=function(){
            argument[0]+="\r\n";
            return socket.write.apply(specialSocket, arguments);
        }
    });
}

module.exports=myNet;