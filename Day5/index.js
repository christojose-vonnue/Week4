import {ACTION_TYPES,INITIAL_STATE,ROUTES} from "./constants.js"

const storeStub = {
    getState: ()=> INITIAL_STATE,
    dispatch : () => {},
    subscribe : () =>{}
};

const routerStub = {
    navigate : (path) => console.log(`Navigated to path ${path}`)
}

function renderApp(rootelement){
    const state =storeStub.getState()
    rootelement.innerHTML=
    `<main>
      <h1>Recipie Browser SPA </h1>
      <p>Current Path: ${state.currentRoute.path}</p>
      <p>Status: Architecture Scaffolded Successfully</p>
    </main>`
}

function initApp() {
    const appRoot = document.getElementById("app")
    if(!appRoot) throw new Error('Root #app element not found in DOM')
    
    // Initial render render
    renderApp(appRoot);

    // Example listener setup for initial load
    console.log('App initialized successfully with state schema:', storeStub.getState());
}

document.addEventListener('DOMContentLoaded',initApp)