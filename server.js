import  express  from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import createGame from './public/game.js'

const app = express()
const httpServer = createServer(app)
const sockets = new Server(httpServer)

app.use(express.static('public'))

let state = {
    players: {},
    fruits:{
        1:{
            x: Math.floor(Math.random() * 10 ),
            y: Math.floor(Math.random() * 10 ),
        },
        2:{
            x: Math.floor(Math.random() * 10 ),
            y: Math.floor(Math.random() * 10 ),
        },
        3:{
            x: Math.floor(Math.random() * 10 ),
            y: Math.floor(Math.random() * 10 ),
        },
    }
 } 

 sockets.on("connection", (socket)=>{
    const playerID = socket.id 
    console.log(` player conectado: ${playerID}`)

    socket.on('disconnect', ()=>{
        delete state.players[socket.id]
        console.log(`player desconectado: ${playerID} `);
    })

    socket.emit('setup', state)

    state.players[socket.id] = {
        x: Math.floor(Math.random() * 10 ),
        y: Math.floor(Math.random() * 10 ),
    }

    sockets.emit('add-player', state)

    socket.on('movePlayer',(value)=>{

        let movementAccepted = {
            ArrowUp: ( player, state ) => {
                if( state.players[player].y - 1 >= 0 ){
                     state.players[player].y -- 
                     return state
                }
                return state
            },
            ArrowDown: ( player, state ) => {
                if( state.players[player].y + 1 < 10 ){
                     state.players[player].y ++ 
                     return state
                }
                return state
            },
            ArrowLeft: ( player, state ) => {
                if( state.players[player].x - 1 >= 0 ){
                     state.players[player].x -- 
                     return state
                }
                return state
            },
            ArrowRight: ( player, state ) => {
                if( state.players[player].x + 1 < 10 ){
                     state.players[player].x ++ 
                     return state
                }
                return state
            },
        }

        let moveFunction = movementAccepted[value.keypress]

        let player = state.players[value.playerId]

        if(moveFunction){
            state =  moveFunction(value.playerId, state)
            sockets.emit('player-moved', state)
        }
    })
}) 


httpServer.listen(3000, ()=>{
    console.log("connection success")
})
