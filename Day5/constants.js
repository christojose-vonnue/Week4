export const ACTION_TYPES={
    NAVIGATE:"NAVIGATE",
    SEARCH:"SEARCH_RECIPES",
    INSTRUCTIONS:"INSTRUCTIONS_TO_COOK",
    TOGGLE_THEME:"TOGGLE_THEME"
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
    selectedRecipieId:null,
    filter:null,
    theme:'dark',
    loading : false,
    error : null
}