import { createServer } from "http";
import { Server } from "socket.io";
import app  from "./app.js";
import { inGameUsers } from "./currentUsers.js"
process.env.TS_NODE_DEV && require("dotenv").config()

const httpServer = createServer(app);
//above a http server is created based on the express configuration in ./app

// We are creating a io server based on our HTTP server
const io = new Server(httpServer, { /* options */ });

// event handlers
io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on("startGame", ({username, room}) => {
        inGameUsers.push({ username: username, socketId: socket.id, room: room })

        socket.join(room)
        console.log(socket.rooms)

        socket.emit("loggedin")
        socket.to(room).emit("newConnection")
    })

    // When we disconnect we remove the user from the online users list
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`)
        inGameUsers = inGameUsers.filter(user => user.socketId !== socket.id)
    })
});

export { httpServer };