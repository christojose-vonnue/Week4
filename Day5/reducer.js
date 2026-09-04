import { ACTION_TYPES, INITIAL_STATE } from './constants.js';

export function appReducer(state=INITIAL_STATE,action={}){ // action = { type : NAVIGATE , payload : null}
    switch(action.type){
        case ACTION_TYPES.NAVIGATE:
            return{
                ...state,
                currentRoute:{
                    path : action.payload.path,
                    params : action.payload.params || {}
                }
            };

        case ACTION_TYPES.INSTRUCTIONS:
            return{
                ...state,
                selectedRecipieId : action.payload 
            };

        case ACTION_TYPES.SEARCH:
            return{
                ...state,
                currentRoute:{
                    categories : action.payload 
                }
            }
        case ACTION_TYPES.TOGGLE_THEME:
            return{
                ...state,
                theme : state.theme === 'dark' ? 'light' : 'dark'
            }
        default:
            return state
    }
}