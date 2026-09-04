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


export function createRouter(store,routesMap){
    const navigate= (path)=>{
        window.history.pushState({},'',path)

        let matchedParams={}
        let matchedPath=path;

        for(const routePattern of routesMap ){
            const { isMatch, params}= matchRoute(routePattern,path)
            if(isMatch){
                matchedParams=params;
                matchedPath=routePattern
                break
            }
        }

        store.dispatch({
            type:ACTION_TYPES.NAVIGATE,
            payload:{path : matchedPath, rawPath : path,params : matchedParams  }
        })
    }
    window.addEventListener('popstate', () => {
        navigate(window.location.pathname);
    });

    document.addEventListener('click',(e)=>{
        const link=e.target.closest('a[data-link]')
        if(link){
            e.preventDefault()
            const href=link.getAttribute('href')
            if (href) navigate(href);
        }
    })
    return { navigate, matchRoute };
}
