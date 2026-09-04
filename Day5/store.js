export function createStore(reducer, initialState){
    let state=initialState;
    const listeners= new Set()

    const getState=()=> state;

    const subscribe=(listener)=>{
        listeners.add(listener)
        return ()=>{
            listeners.delete(listener)
        }
    }

    const dispatch=(action)=>{
        state=reducer(state,action)
        listeners.forEach((listener)=>{listener(state)})
    }

    return{
        getState,
        subscribe,
        dispatch
    }
}