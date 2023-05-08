import  express  from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()
const httpServer = createServer(app)
const sockets = new Server(httpServer)

app.use(express.static('public'))

httpServer.listen(3000, ()=>{
    console.log("connection success")
})
