import { ACTION_TYPES, INITIAL_STATE } from './constants.js';

export function appReducer(state=INITIAL_STATE,action={}){ // action = { type : NAVIGATE , payload : null}
    switch(action.type){
        case ACTION_TYPES.NAVIGATE:
            return{
                ...state,
                currentRoute:{
                    path : action.payload.path,
                    rawPath : action.payload.rawPath,
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
                filter : action.payload
            }
        case ACTION_TYPES.TOGGLE_THEME:
            return{
                ...state,
                theme : state.theme === 'dark' ? 'light' : 'dark'
            }

        case ACTION_TYPES.ADD_RECIPE:
             return { ...state,
                 recipes: [ ...state.recipes, action.payload ], 
                 error: null };
        
        case ACTION_TYPES.UPDATE_RECIPE: 
            return { ...state, 
                    recipes: state.recipes.map((recipe) => String(recipe.id) === String(action.payload.id) ? { ...recipe, ...action.payload } : recipe ), 
                    error: null };
        case ACTION_TYPES.DELETE_RECIPE: 
            return { ...state, 
                recipes: state.recipes.filter( (recipe) => String(recipe.id) !== String(action.payload) ), 
                selectedRecipeId: String(state.selectedRecipeId) === String(action.payload) ? null : state.selectedRecipeId, 
                error: null };

        // Loading aync actions 
        case ACTION_TYPES.LOAD_RECIPES_START: 
            return { ...state, 
                    loading: true, 
                    error: null };

        case ACTION_TYPES.LOAD_RECIPES_SUCCESS: 
            return { ...state, 
                    recipes: action.payload, 
                    loading: false, 
                    error: null };

        case ACTION_TYPES.LOAD_RECIPES_ERROR: 
            return { ...state, 
                    loading: false, 
                    error: action.payload };
        default:
            return state
    }
}