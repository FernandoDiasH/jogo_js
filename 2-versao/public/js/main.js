import createGame from './game.js'

let game = createGame()

let socket = io()


socket.on('connect', ()=>{
   game.addPlayer(socket.id)
})

socket.on('setup', (state)=>{
    game.setState(state)
})

socket.on('add_player', (command)=>{
    console.log(command);
    game.addPlayer(command)
    console.log(`Player add: ${command.playerId}`);
})

socket.on('remove_player', (command)=>{
    console.log(`Player remove: ${command.playerId}`);
    game.removePlayer(command)
})

