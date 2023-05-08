export default function createGame() {
    let state = {
        players:{},
        fruits:{},
        width: 10,
        height: 10
    }

    function addPlayer(name){
        state.players[name] = {
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10)
        }
    }

    function removePlayer(name){
        delete state.players[name] 
    }

    function addFruit(){
        let id = Math.random() * 1000
        state.fruits[id] = {
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10)
        }
    }

    function removeFruit(fruit){
        delete state.fruits[fruit]
    }

    function movePlayer(player, keyPress){

        let movement = {
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

        let moveAction = movement[keyPress]

        if(!moveAction){
            throw new Error('Movimento nao cadastratado')
        }

        state = moveAction(player, state)
        
        for(let fruit in state.fruits){
            if( state.fruits[fruit].x == state.players[player].x && state.fruits[fruit].y == state.players[player].y ){
                removeFruit(fruit)
            }
        }
    }

    return {
        state,
        addPlayer,
        removePlayer,
        movePlayer,
        addFruit,
    }
}
