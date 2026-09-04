# SPA

## SPA : Recipie Browser

### Step 1 : Define state, Route, Action

- **Build constants.js**

```
NUMBERED BLUEPRINT:

Source Code Implementation (constants.js):
1. Define ACTION_TYPES object containing string identifiers:
   - NAVIGATE: route changes
   - SET_MOVIES: loading movies list
   - ADD_MOVIE: adding a new movie
   - SELECT_MOVIE: choosing a movie for detail view
   - SET_FILTER: changing genre/search filter
   - TOGGLE_THEME: toggling light/dark mode

2. Define ROUTES object mapping human names to URL paths:
   - HOME: '/'
   - LIST: '/list'
   - DETAIL: '/detail/:id'
   - SETTINGS: '/settings'

3. Define INITIAL_STATE object representing the default app memory schema:
   - currentRoute: Object { path, params }
   - movies: Array of movie objects
   - selectedMovieId: Null or String
   - filter: String
   - theme: String ('light' or 'dark')

4. Export all structures for application-wide consumption.
```
-- **Write scaffold** *(Initial Styles)*

NUMBERED BLUEPRINT:

```
Source Code Implementation (index.js):
1. Import INITIAL_STATE and ROUTES from constants.js.
2. Import placeholder functions (stubs) for router, store, and pages.
3. Define initApp() bootstrapper:
   a. Grab root container element: document.getElementById('app').
   b. Instantiate Store with INITIAL_STATE.
   c. Register routes: map paths (HOME, LIST, DETAIL, SETTINGS) to page render functions.
   d. Subscribe render loop to store updates: whenever store changes, update DOM root.
   e. Trigger initial route navigation based on window.location.pathname.
4. Attach initApp to 'DOMContentLoaded' event listener.
```
### Step 2 : Create the `store.js` , Implement sub/pub method in it

```
1. Sequential Logic
`createStore(reducer, initialState)` creates a private closure holding currentState and an array of listeners.

`getState()` returns a copy/snapshot of currentState.

`subscribe(listener)` adds a callback to the listeners array and **returns an unsubscribe function** to remove it later.

`dispatch(action)` runs `currentState = reducer(currentState, action)` and executes every callback in listeners.
```

- Well the reducer is the one who returns the updated (!!pure change) state based on the action it has been provided

- in store.js we wrote
state=reducer(state,action)..
which makes sense

- so all actions which are defined in the constants
```export const ACTION_TYPES={
    NAVIGATE:"NAVIGATE",
    SEARCH:"SEARCH_RECIPES",
    INSTRUCTIONS:"INSTRUCTIONS_TO_COOK",
    TOGGLE_THEME:"TOGGLE_THEME"
}```

- must either have a connection import or a direction sequence of actions for each of the ACTION_TYPES

Router.js is the file that observes the url and prompts to update the store
AS links in the url change , router observes that and renders subsequent render function or ACTION

[ User clicks <a href="/list"> ] 
        │
        ▼ (Intercepted by Router)
1. history.pushState({}, '', '/list')   <-- Changes URL quietly
2. Match '/list' against route rules
3. Extract params (e.g. { id: '42' })
4. store.dispatch({ type: 'NAVIGATE', payload: { path: '/list', params } })
        │
        ▼ (Store updates state)
5. UI Subscriptions trigger & render List Page