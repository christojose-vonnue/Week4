import { ACTION_TYPES,RoutePath,CurrentRoute,Appstate,INITIAL_STATE,THEME } from './constants'

// Stub........ Interface

interface StoreStub{
    getState:()=> Appstate,
    dispatch:(action:{
        type:string;
        payload?:unknown
    })=>void,
    subscribe: (listener: () => void) => () => void;
}

interface RouterStub {
  navigate: (path: RoutePath) => void;
}

// Functions
// 2. Apply interfaces to the stub objects
const storeStub : StoreStub = {
    getState: ()=> INITIAL_STATE,
    dispatch : (action) => {},
    subscribe : (listener) =>{
        return () => {}
    }
};

const routerStub: RouterStub = {
  navigate: (path: RoutePath) => console.log(`Navigated to path ${path}`)
};

function renderApp(rootelement: HTMLElement) : void{
    const state : Appstate =storeStub.getState()
    rootelement.innerHTML=
    `<main>
      <h1>Recipie Browser SPA </h1>
      <p>Current Path: ${state.currentRoute.path}</p>
      <p>Status: Architecture Scaffolded Successfully</p>
    </main>`
}

function initApp() : void {
    const appRoot = document.getElementById("app") as HTMLElement | null
    if(!appRoot) {
        throw new Error('Root #app element not found in DOM')
    }
    // Initial render render
    renderApp(appRoot);

    // Example listener setup for initial load
    console.log('App initialized successfully with state schema:', storeStub.getState());
}

document.addEventListener("DOMContentLoaded", initApp);