import  express  from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static('public'))

let game = {}

io.on("connection", (socket)=>{

    game[socket.id] = {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10)
    }
    
    socket.on('keyPress', (key)=>{
        if(key=== "ArrowUp"){
            if( game[socket.id].y - 1 >= 0 ){
                game[socket.id].y --
            }
        }

        if(key === "ArrowDown"){
            if(game[socket.id].y + 1 <= 9 ){
                game[socket.id].y ++
            }
        }

        if(key == "ArrowRight"){
            if(game[socket.id].x + 1 <= 9){
                game[socket.id].x ++
            }
        }

        if(key == "ArrowLeft"){
            if(game[socket.id].x - 1 >= 0 ){
                game[socket.id].x --
            }
        }
        io.emit('game', game)
    })

    console.log(game);
    io.emit('game', game)
    
}) 


httpServer.listen(3000, ()=>{
    console.log("connection success")
})
