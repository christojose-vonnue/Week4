import { Button, Card, Modal } from "./component.js";


export function renderHomePage({ state, router }) {

    const main = document.createElement("main");
    main.className = "page page-home";

    const title = document.createElement("h1");
    title.textContent = "Recipe Browser";

    const description = document.createElement("p");
    description.textContent =
        "Discover recipes from different cuisines and explore cooking instructions.";

    const browseButton = Button({
        text: "Browse Recipes",
        className: "btn-primary",
        onClick: () => router.navigate("/list")
    });

    main.appendChild(title);
    main.appendChild(description);
    main.appendChild(browseButton);

    return main;
}


export function renderListPage({ state, router }) {

    const main = document.createElement("main");
    main.className = "page page-list";

    const title = document.createElement("h1");
    title.textContent = "Recipes";

    main.appendChild(title);


    const recipeContainer = document.createElement("section");
    recipeContainer.className = "recipe-grid";


    const recipes = Array.isArray(state.recipes)
        ? state.recipes
        : [];


    if (recipes.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.textContent =
            "No recipes available yet.";

        recipeContainer.appendChild(emptyMessage);

    } else {

        recipes.forEach((recipe) => {

            const card = Card({
                title: recipe.title,
                description: recipe.description,
                category: recipe.category,

                onClick: () => {
                    router.navigate(
                        `/detail/${recipe.id}`
                    );
                }
            });

            recipeContainer.appendChild(card);
        });
    }


    main.appendChild(recipeContainer);

    return main;
}



export function renderDetailPage({ state, params, router }) {

    const main = document.createElement("main");
    main.className = "page page-detail";


    const recipeId = params?.id;


    const recipes = Array.isArray(state.recipes)
        ? state.recipes
        : [];


    const recipe = recipes.find(
        (item) => String(item.id) === String(recipeId)
    );


    if (!recipe) {

        const title = document.createElement("h1");

        title.textContent = "Recipe Not Found";

        const backButton = Button({
            text: "Back to Recipes",
            onClick: () => router.navigate("/list")
        });

        main.appendChild(title);
        main.appendChild(backButton);

        return main;
    }


    const title = document.createElement("h1");

    title.textContent = recipe.title;


    const category = document.createElement("p");

    category.textContent =
        `Category: ${recipe.category}`;


    const description = document.createElement("p");

    description.textContent =
        recipe.description;


    const backButton = Button({
        text: "Back to Recipes",
        onClick: () => router.navigate("/list")
    });


    main.appendChild(title);
    main.appendChild(category);
    main.appendChild(description);
    main.appendChild(backButton);


    return main;
}


export function renderSettingsPage({ state, router }) {

    const main = document.createElement("main");
    main.className = "page page-settings";


    const title = document.createElement("h1");

    title.textContent = "Settings";


    const themeText = document.createElement("p");

    themeText.textContent =
        `Current theme: ${state.theme}`;


    const themeButton = Button({
        text: "Toggle Theme",
        onClick: () => {

            if (typeof router.toggleTheme === "function") {
                router.toggleTheme();
            }
        }
    });


    main.appendChild(title);
    main.appendChild(themeText);
    main.appendChild(themeButton);


    return main;
}