import { INITIAL_STATE,ROUTES } from "./constants.js";
import { appReducer} from "./reducer.js";
import { createStore } from "./store.js";
import { createRouter } from "./router.js";

import {
    renderHomePage,
    renderListPage,
    renderDetailPage,
    renderSettingsPage
} from "./pages.js";

//Store

const store = createStore(
    INITIAL_STATE,
    appReducer
);

// Router

const router = createRouter(store);

router.register(
    ROUTES.HOME,
    renderHomePage
);

router.register(
    ROUTES.LIST,
    renderListPage
);

router.register(
    ROUTES.DETAIL,
    renderDetailPage
);

router.register(
    ROUTES.SETTINGS,
    renderSettingsPage
);


// Render

function renderApp(rootElement) {
    const state = store.getState();
    const currentRoute = state.currentRoute;
    const resolvedRoute = router.resolve( currentRoute.rawPath);


    // Clear previous page
    rootElement.replaceChildren();

    // Handle unknown routes
    if (!resolvedRoute) {
        const errorPage = document.createElement("main");
        errorPage.className = "page page-error";
        const heading = document.createElement("h1");
        heading.textContent = "404 - Page Not Found";
        errorPage.appendChild(heading);
        rootElement.appendChild(errorPage);
        return;
    }


    // Get the page component
    const PageComponent = resolvedRoute.component;

    // Render the page
    const pageElement = PageComponent({
        state,
        params: currentRoute.params,
        router,
        store
    });

    rootElement.appendChild(pageElement);
}


// We start / intitalize here

function initApp() {
    const appRoot = document.getElementById("app");
    if (!appRoot) {
        throw new Error(
            "Root #app element not found in DOM"
        );
    }
    store.subscribe(() => { 
        renderApp(appRoot);
    });

    renderApp(appRoot);

    // url is updated here

    const currentPath = window.location.pathname;

    if (currentPath !== ROUTES.HOME) {
        router.navigate(currentPath);
    }
}

document.addEventListener("DOMContentLoaded", initApp);
