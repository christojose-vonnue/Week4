export function createStore(reducer, initialState,middlewares = []){
    let state=initialState;
    const listeners= new Set()

    function getState(){
        return state;
    } 

    function subscribe(listener){
        listeners.add(listener)
        return function unsubscribe(){
            listeners.delete(listener)
        }
    }

    // const dispatch=(action)=>{
    //     const previousState = state;
    //     state=reducer(state,action)
    //     if(state !== previousState){

    //         listeners.forEach((listener)=>{listener(state,previousState,action)})
    //     }
    // }
    function baseDispatch(action) { 
        const previousState = state 
        state = reducer(state, action)
        if (state !== previousState) { 
            listeners.forEach( (listener) => { 
                listener( state, previousState, action ); 
            } ); 
        } return action; } 
        
    // Middleware API 
    const middlewareAPI = { getState, dispatch: (action) => dispatch(action) }; 
    // Build middleware chain
    const chain = middlewares.map( (middleware) => middleware(middlewareAPI) ); 
    
    let dispatch = chain.reduceRight( (next, middleware) => middleware(next), baseDispatch );


    return{
        getState,
        subscribe,
        dispatch
    }
}