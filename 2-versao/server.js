import  express  from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import createGame from './public/js/game.js' 

const app = express()
const httpServer = createServer(app)
const sockets = new Server(httpServer)

app.use(express.static('public'))

const game = createGame()

game.attach((command)=>{
    console.log(`emitting ${command}`)
    sockets.emit(command.type, command)
})

sockets.on('connection', (socket)=>{
    const playerId = socket.id
   
    console.log('connected: ' + playerId)

    game.setState('setup', game.state)

    game.addPlayer({ playerId: playerId })

    socket.on('disconnect', ()=>{
        console.log(`disconnected: ${playerId}`)
        game.removePlayer({ playerId: playerId })
    })

})

httpServer.listen(3000, ()=>{
    console.log("connection success")
})
