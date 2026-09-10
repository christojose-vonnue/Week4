export function createStore(reducer, initialState){
    let state=initialState;
    const listeners= new Set()

    function getState(){
        return state;
    } 

    const subscribe=(listener)=>{
        listeners.add(listener)
        return function unsubscribe(){
            listeners.delete(listener)
        }
    }

    const dispatch=(action)=>{
        const previousState = state;
        state=reducer(state,action)
        if(state !== previousState){

            listeners.forEach((listener)=>{listener(state,previousState,action)})
        }
    }

    return{
        getState,
        subscribe,
        dispatch
    }
}