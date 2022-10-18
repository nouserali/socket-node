import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const socket = new Server(httpServer, {
	cors: {
		origins: ['http://dev.adaiya.in', 'http://localhost:4200', 'http://localhost:9002'],
		'transports': ['websocket', 'pollings']
	},
});

const users = {};

socket.on('connection', (socket) => {
	console.log('socket is connect',socket)
	
});

socket.on('error', (error) => {
	console.log('socket is connect',error)
	
});
socket.on('join', function(data){
	  socket.join(data.questionId);
	  users[socket.id] = data.user;
	  var  JoinRes = {
		message: data.user+' has joined '+data.qName+" question",
		users:users,
	};
	  socket.broadcast.to(data.questionId).emit('new user joined', JoinRes);
	});
socket.on('disconnect', function () {
	var JoinRes = {
		message: data.user + ' has joined ' + data.qName + " question",
		users: users,
	};
	socket.broadcast.to(data.questionId).emit('new user joined', JoinRes);
	delete users[socket.id];
});
httpServer.listen(9002, () => {
	console.log("=======================11");
});