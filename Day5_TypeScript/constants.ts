export const ACTION_TYPES={
    NAVIGATE:"NAVIGATE",
    SEARCH:"SEARCH_RECIPES",
    INSTRUCTIONS:"INSTRUCTIONS_TO_COOK",
    TOGGLE_THEME:"TOGGLE_THEME"
} as const;

export type ActionType= typeof ACTION_TYPES[keyof typeof ACTION_TYPES]

export const ROUTES = {
  HOME: "/",
  LIST: "/list",
  INSTRUCTIONS: "/instructions",
  SETTINGS: "/settings"
} as const;

export type RoutePath= typeof ROUTES[keyof typeof ROUTES]

export type THEME= 'dark' | 'light'

export interface CurrentRoute{
    path : RoutePath,
    params : Record<string, string | number>
}

export interface Appstate{
    currentRoute:CurrentRoute,
    categories:string[],
    selectedRecipieId:string | null,
    filter : string | null,
    theme : THEME
}

export const INITIAL_STATE : Appstate={
    currentRoute:{
        path:ROUTES.HOME,
        params:{}
    },
    categories:["Indian","Japanese","American"], //sections or search params 
    selectedRecipieId:null,
    filter:null,
    theme:'dark'
}