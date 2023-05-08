export default function renderScreen (screen, game, requestAnimationFrame, currentId) {

    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    context.clearRect(0, 0,  10 , 10)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        if(playerId != currentId){
            context.fillStyle = "#000000"
            context.fillRect(player.x, player.y, 1, 1 )
        }else{
            context.fillStyle = "#EBD000"
            context.fillRect(player.x, player.y, 1, 1 )
        } 
    }

    for(const fruitId in game.state.fruits){
        const fruit = game.state.fruits[fruitId] 
        context.fillStyle = "#17E000"
        context.fillRect(fruit.x, fruit.y, 1, 1 )
    }

    requestAnimationFrame(()=>{
        renderScreen(screen, game, requestAnimationFrame, currentId )
    })
}