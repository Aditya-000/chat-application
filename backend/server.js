const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");


app.use(cors());



const server = http.createServer(app);
const io = new Server(server,{
  cors : {
    origin : "http://localhost:5173",
    methods : ["GET" , "POST"]
  },
});



io.on("connection" ,(socket) => {
  console.log("A user Connected" , socket.id);
  socket.on("send-message" , (message) =>{
     //broadcast to all users
     io.emit("recieved-message" , message)
  })

  socket.on("disconnect" , () => {
    console.log("User disconnected")
  })
})


server.listen(5000 , () => {
  console.log("Server running on port 5000")
})

