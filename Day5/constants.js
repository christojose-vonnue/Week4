export const ACTION_TYPES={
    NAVIGATE:"NAVIGATE",
    SEARCH:"SEARCH_RECIPES",
    INSTRUCTIONS:"INSTRUCTIONS_TO_COOK",
    TOGGLE_THEME:"TOGGLE_THEME",

    // Recipe operations 
    ADD_RECIPE: "ADD_RECIPE", 
    UPDATE_RECIPE: "UPDATE_RECIPE", 
    DELETE_RECIPE: "DELETE_RECIPE",

    // Async states 
    LOAD_RECIPES_START: "LOAD_RECIPES_START", 
    LOAD_RECIPES_SUCCESS: "LOAD_RECIPES_SUCCESS", 
    LOAD_RECIPES_ERROR: "LOAD_RECIPES_ERROR"
}

export const ROUTES={
    HOME:"/",
    LIST:"/list",
    DETAIL: "/detail/:id",
    SETTINGS:"/settings"
}

export const INITIAL_STATE={
    currentRoute:{
        path:ROUTES.HOME,
        rawPath: ROUTES.HOME,
        params:{}
    },
    categories:["Indian","Japanese","American"], //sections or search params 
    selectedRecipeId:null,
    filter:null,
    theme:'dark',
    loading : false,
    error : null
}