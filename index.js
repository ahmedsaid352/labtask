const express = require('express')
const app = express()

const PORT = 80

app.get('/',function(req,res){
    res.sendFile(__dirname+"/views/index.html");
});

const server = app.listen(PORT,function(){
    console.log("Server is runinng at port "+PORT);
});

const SocketServer = require('ws').Server;
const wss = new SocketServer({ server });



wss.on('connection', function(ws){
	console.log('Client connected');

	ws.on('message', function(msg){
		//عملت الخطوة الجايه عشان التشفير
		
		myjson = JSON.parse(msg);
		broadcast(myjson);
	});
	
	ws.on('close', function(){
		console.log('Client disconnected');
	});
});

function broadcast(msg) {
	wss.clients.forEach(function (client) {
		if (client.readyState === client.OPEN) { 
			client.send(msg);
		}else{
			console.log("client off");
		}
	});
}