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



    setInterval(()=>{
        let fruitId = Math.random() * 10000

        state.fruits[fruitId]  = {
            x: Math.floor(Math.random() * 10 ),
            y: Math.floor(Math.random() * 10 ),
        }

        socket.emit('add-fruit', state)

    }, 10000 )


    socket.on('movePlayer',(value)=>{

        let movementAccepted = {
            ArrowUp: ( player ) => {
                if( player.y - 1 >= 0 ){
                     player.y -- 
                     return player
                }
                return player
            },
            ArrowDown: ( player ) => {
                if( player.y + 1 < 10 ){
                     player.y ++ 
                     return player
                }
                return player
            },
            ArrowLeft: ( player ) => {
                if( player.x - 1 >= 0 ){
                     player.x -- 
                     return player
                }
                return player
            },
            ArrowRight: ( player ) => {
                if( player.x + 1 < 10 ){
                     player.x ++ 
                     return player
                }
                return player
            },
        }

        let moveFunction = movementAccepted[value.keypress]
        let player = state.players[value.playerId]

        if(moveFunction){
             player = moveFunction(player)
             for(const fruitId in state.fruits){
                let fruit = state.fruits[fruitId]
                if(fruit.x == player.x && fruit.y === player.y ){
                    delete state.fruits[fruitId]
                }
            }

            state.players[value.playerId] = player
            sockets.emit('player-moved', state)
        }
    })
}) 


httpServer.listen(3000, ()=>{
    console.log("connection success")
})
