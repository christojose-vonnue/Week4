import { ACTION_TYPES } from "./constants.js";
const STORAGE_KEY = "recipe-browser-recipes";
export function storageMiddleware({ getState }) {

    return function storageMiddlewareNext(next) {

        return function storageDispatch(action) {
            const result = next(action);
            if (
                action.type === ACTION_TYPES.ADD_RECIPE ||
                action.type === ACTION_TYPES.UPDATE_RECIPE ||
                action.type === ACTION_TYPES.DELETE_RECIPE
            ) {

                const recipes = getState().recipes;

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(recipes)
                );
            }
            return result;
        };
    };
}


export function loadRecipesFromStorage() {
    try {
        const savedRecipes =
            localStorage.getItem(STORAGE_KEY);
        if (!savedRecipes) {
            return [];
        }
        return JSON.parse(savedRecipes);
    } catch (error) {
        console.error(
            "Failed to load recipes:",
            error
        );
        return [];
    }
}
