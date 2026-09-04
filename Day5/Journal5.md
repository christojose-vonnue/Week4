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
