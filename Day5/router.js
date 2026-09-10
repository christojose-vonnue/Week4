// router.js - Client-Side Router with Dynamic Route Parser
import { ACTION_TYPES } from './constants.js';


export function matchRoute(templatePattern, currentPath) {
  const paramNames = [];
  // Convert /detail/:id into regex string: ^/detail/([^/]+)$
  const regexPath = templatePattern.replace(/:([^/]+)/g, (_, key) => {
    paramNames.push(key);
    return '([^/]+)';
  });

  const regex = new RegExp(`^${regexPath}$`);
  const match = currentPath.match(regex);

  if (!match) return { isMatch: false, params: {} };

  const params = paramNames.reduce((acc, paramName, index) => {
    acc[paramName] = match[index + 1];
    return acc;
  }, {});

  return { isMatch: true, params };
}


export function createRouter(store) {

    const routes = new Map();

    function register(path, component) {
        routes.set(path, component);
    }


    function resolve(path) {

        for (const [routePattern, component] of routes) {

            const result = matchRoute(
                routePattern,
                path
            );

            if (result.isMatch) {
                return {
                    path: routePattern,
                    rawPath: path,
                    params: result.params,
                    component
                };
            }
        }

        return null;
    }


    function navigate(path) {

        const matchedRoute = resolve(path);

        if (!matchedRoute) {
            console.warn(`No route registered for: ${path}`);
            return;
        }

        const currentPath = window.location.pathname;

        if (currentPath !== path) {
            window.history.pushState({}, "", path);
        }

        store.dispatch({
            type: ACTION_TYPES.NAVIGATE,

            payload: {
                path: matchedRoute.path,
                rawPath: matchedRoute.rawPath,
                params: matchedRoute.params
            }
        });
    }


    function handlePopState() {
        navigate(window.location.pathname);
    }


    window.addEventListener(
        "popstate",
        handlePopState
    );


    document.addEventListener("click", (event) => {

        const link = event.target.closest(
            "a[data-link]"
        );

        if (!link) {
            return;
        }

        event.preventDefault();

        const href = link.getAttribute("href");

        if (href) {
            navigate(href);
        }
    });


    return {
        register,
        navigate,
        resolve,
        matchRoute
    };
}
