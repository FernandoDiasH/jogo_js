export default function createGame(){

    let observer = []

    let state = {
        players:{},
        fruits:{},
        fruitColor:'#14d5ff',
        playerColor:'#000000',
        anyPlayerColor:'#ff1614',
        width:10,
        heigh:10
    }

    function attach(command){
        observer.push(command)
    }

    function notifyAll(command){
        for(const observerFunction of observer){
            observerFunction(command.type, command)
        }
    }

    function setState(command){
        Object.assign(state, command.state)

        notifyAll({
            type:'setup',
            state: state
        })
    }

    function addPlayer(data){
        let playerId = data.playerId
        let playerX = data.playerX ? data.playerX : Math.floor(Math.random() * 10 )
        let playerY = data.playerY  ? data.playerY : Math.floor(Math.random() * 10 )

        state.players[playerId] = {
            playerX: playerX,
            playerY: playerY,
        }
        
        notifyAll( {
            type: 'add_player', 
            playerId: playerId,
            playerX: playerX,
            playerY: playerY,
        })
    }
    
    function removePlayer(command){
        delete state.players[command.playerId]

        notifyAll({
            type:"remove_player", 
            playerId: command.playerId
        })
    }

    

    return {
        state,
        setState,
        attach,
        addPlayer,
        removePlayer
    }

}