import  express  from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static('public'))


io.on("connection", (socket)=>{
    console.log("test test"); 
})

httpServer.listen(3000, ()=>{
    console.log("connection success")
})
