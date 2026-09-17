// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    renderHomePage,
    renderListPage,
    renderDetailPage,
    renderSettingsPage
} from "../page.js";
import { ACTION_TYPES } from "../constants.js";

const recipe = {
    id: 1,
    title: "Chicken Curry",
    description: "A simple Indian chicken curry",
    category: "Indian"
};

const categories = ["Indian", "Japanese", "American"];

function createState(overrides = {}) {
    return {
        recipes: [recipe],
        categories,
        loading: false,
        error: null,
        theme: "dark",
        ...overrides
    };
}

function createRouter() {
    return {
        navigate: vi.fn()
    };
}

function createStore() {
    return {
        dispatch: vi.fn()
    };
}

beforeEach(() => {
    document.body.innerHTML = "";
});


describe("renderHomePage", () => {
    it("renders the home page", () => {
        const router = createRouter();

        const page = renderHomePage({
            state: createState(),
            router
        });

        expect(page.className).toContain("page-home");
        expect(page.textContent).toContain("Recipe Browser");
        expect(page.textContent).toContain(
            "Discover recipes from different cuisines"
        );
        expect(page.textContent).toContain("Browse Recipes");
    });

    it("navigates to recipes when Browse Recipes is clicked", () => {
        const router = createRouter();

        const page = renderHomePage({
            state: createState(),
            router
        });

        const button = Array.from(
            page.querySelectorAll("button")
        ).find(button => button.textContent === "Browse Recipes");

        button.click();

        expect(router.navigate).toHaveBeenCalledWith("/list");
    });
});


describe("renderListPage", () => {
    it("renders recipes", () => {
        const router = createRouter();
        const store = createStore();

        const page = renderListPage({
            state: createState(),
            router,
            store
        });

        expect(page.textContent).toContain("Recipes");
        expect(page.textContent).toContain("Chicken Curry");
        expect(page.textContent).toContain("A simple Indian chicken curry");
        expect(page.textContent).toContain("Indian");
        expect(page.textContent).toContain("Add Recipe");
        expect(page.textContent).toContain("Edit");
        expect(page.textContent).toContain("Delete");
    });

    it("navigates to recipe detail when a card is clicked", () => {
        const router = createRouter();
        const store = createStore();

        const page = renderListPage({
            state: createState(),
            router,
            store
        });

        const card = page.querySelector(".card");

        card.click();

        expect(router.navigate).toHaveBeenCalledWith("/detail/1");
    });

    it("dispatches DELETE_RECIPE when Delete is clicked", () => {
        const router = createRouter();
        const store = createStore();

        const page = renderListPage({
            state: createState(),
            router,
            store
        });

        const deleteButton = Array.from(
            page.querySelectorAll("button")
        ).find(button => button.textContent === "Delete");

        deleteButton.click();

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTION_TYPES.DELETE_RECIPE,
            payload: 1
        });
    });

    it("shows loading state", () => {
        const router = createRouter();
        const store = createStore();

        const page = renderListPage({
            state: createState({
                loading: true
            }),
            router,
            store
        });

        expect(page.textContent).toContain("Loading recipes...");
    });

    it("shows error state", () => {
        const router = createRouter();
        const store = createStore();

        const page = renderListPage({
            state: createState({
                error: "Failed to load recipes"
            }),
            router,
            store
        });

        expect(page.textContent).toContain(
            "Error: Failed to load recipes"
        );
    });

    it("shows empty state when there are no recipes", () => {
        const router = createRouter();
        const store = createStore();

        const page = renderListPage({
            state: createState({
                recipes: []
            }),
            router,
            store
        });

        expect(page.textContent).toContain(
            "No recipes available yet."
        );
    });

    it("handles missing recipes array", () => {
        const router = createRouter();
        const store = createStore();

        const page = renderListPage({
            state: createState({
                recipes: undefined
            }),
            router,
            store
        });

        expect(page.textContent).toContain(
            "No recipes available yet."
        );
    });

    it("opens Add Recipe modal", () => {
        const router = createRouter();
        const store = createStore();

        const page = renderListPage({
            state: createState(),
            router,
            store
        });

        const addButton = Array.from(
            page.querySelectorAll("button")
        ).find(button => button.textContent === "Add Recipe");

        addButton.click();

        expect(document.body.textContent).toContain(
            "Add New Recipe"
        );

        expect(document.body.querySelector(
            'input[name="title"]'
        )).toBeTruthy();

        expect(document.body.querySelector(
            'textarea[name="description"]'
        )).toBeTruthy();

        expect(document.body.querySelector(
            'select[name="category"]'
        )).toBeTruthy();
    });

    it("adds a recipe through the Add Recipe form", () => {
        const router = createRouter();
        const store = createStore();

        vi.spyOn(Date, "now").mockReturnValue(12345);

        const page = renderListPage({
            state: createState(),
            router,
            store
        });

        const addButton = Array.from(
            page.querySelectorAll("button")
        ).find(button => button.textContent === "Add Recipe");

        addButton.click();

        const form = document.querySelector("form");
        const titleInput = form.querySelector('input[name="title"]');
        const descriptionInput = form.querySelector(
            'textarea[name="description"]'
        );
        const categorySelect = form.querySelector(
            'select[name="category"]'
        );

        titleInput.value = "  Pasta  ";
        descriptionInput.value = "  Delicious pasta  ";
        categorySelect.value = "American";

        form.dispatchEvent(
            new Event("submit", {
                bubbles: true,
                cancelable: true
            })
        );

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTION_TYPES.ADD_RECIPE,
            payload: {
                id: 12345,
                title: "Pasta",
                description: "Delicious pasta",
                category: "American"
            }
        });

        expect(document.querySelector(".modal-overlay")).toBeNull();

        vi.restoreAllMocks();
    });

    it("closes Add Recipe modal with Escape", () => {
        const router = createRouter();
        const store = createStore();

        const page = renderListPage({
            state: createState(),
            router,
            store
        });

        const addButton = Array.from(
            page.querySelectorAll("button")
        ).find(button => button.textContent === "Add Recipe");

        addButton.click();

        const form = document.querySelector("form");

        form.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "Escape",
                bubbles: true
            })
        );

        expect(document.querySelector(".modal-overlay")).toBeNull();
    });

    it("opens Edit Recipe modal", () => {
        const router = createRouter();
        const store = createStore();

        const page = renderListPage({
            state: createState(),
            router,
            store
        });

        const editButton = Array.from(
            page.querySelectorAll("button")
        ).find(button => button.textContent === "Edit");

        editButton.click();

        expect(document.body.textContent).toContain(
            "Edit Recipe"
        );

        const titleInput = document.querySelector(
            'input[name="title"]'
        );

        expect(titleInput.value).toBe("Chicken Curry");
    });

    it("updates a recipe through the Edit Recipe form", () => {
        const router = createRouter();
        const store = createStore();

        const page = renderListPage({
            state: createState(),
            router,
            store
        });

        const editButton = Array.from(
            page.querySelectorAll("button")
        ).find(button => button.textContent === "Edit");

        editButton.click();

        const form = document.querySelector("form");

        const titleInput = form.querySelector(
            'input[name="title"]'
        );

        const descriptionInput = form.querySelector(
            'textarea[name="description"]'
        );

        const categorySelect = form.querySelector(
            'select[name="category"]'
        );

        titleInput.value = "Updated Curry";
        descriptionInput.value = "Updated description";
        categorySelect.value = "Japanese";

        form.dispatchEvent(
            new Event("submit", {
                bubbles: true,
                cancelable: true
            })
        );

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTION_TYPES.UPDATE_RECIPE,
            payload: {
                id: 1,
                title: "Updated Curry",
                description: "Updated description",
                category: "Japanese"
            }
        });

        expect(document.querySelector(".modal-overlay")).toBeNull();
    });

    it("closes Edit Recipe modal with Escape", () => {
        const router = createRouter();
        const store = createStore();

        const page = renderListPage({
            state: createState(),
            router,
            store
        });

        const editButton = Array.from(
            page.querySelectorAll("button")
        ).find(button => button.textContent === "Edit");

        editButton.click();

        const form = document.querySelector("form");

        form.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "Escape",
                bubbles: true
            })
        );

        expect(document.querySelector(".modal-overlay")).toBeNull();
    });
});


describe("renderDetailPage", () => {
    it("renders a recipe detail page", () => {
        const router = createRouter();

        const page = renderDetailPage({
            state: createState(),
            params: { id: "1" },
            router
        });

        expect(page.textContent).toContain("Chicken Curry");
        expect(page.textContent).toContain("Category: Indian");
        expect(page.textContent).toContain(
            "A simple Indian chicken curry"
        );
        expect(page.textContent).toContain("Back to Recipes");
    });

    it("navigates back to recipes", () => {
        const router = createRouter();

        const page = renderDetailPage({
            state: createState(),
            params: { id: "1" },
            router
        });

        const button = Array.from(
            page.querySelectorAll("button")
        ).find(button => button.textContent === "Back to Recipes");

        button.click();

        expect(router.navigate).toHaveBeenCalledWith("/list");
    });

    it("shows Recipe Not Found for an invalid id", () => {
        const router = createRouter();

        const page = renderDetailPage({
            state: createState(),
            params: { id: "999" },
            router
        });

        expect(page.textContent).toContain("Recipe Not Found");
    });

    it("handles missing recipes in detail page", () => {
        const router = createRouter();

        const page = renderDetailPage({
            state: createState({
                recipes: undefined
            }),
            params: { id: "1" },
            router
        });

        expect(page.textContent).toContain("Recipe Not Found");
    });
});


describe("renderSettingsPage", () => {
    it("renders the current theme", () => {
        const router = createRouter();
        const store = createStore();

        const page = renderSettingsPage({
            state: createState({
                theme: "dark"
            }),
            router,
            store
        });

        expect(page.textContent).toContain("Settings");
        expect(page.textContent).toContain(
            "Current theme: dark"
        );
        expect(page.textContent).toContain("Toggle Theme");
    });

    it("dispatches TOGGLE_THEME when clicked", () => {
        const router = createRouter();
        const store = createStore();

        const page = renderSettingsPage({
            state: createState(),
            router,
            store
        });

        const button = Array.from(
            page.querySelectorAll("button")
        ).find(button => button.textContent === "Toggle Theme");

        button.click();

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTION_TYPES.TOGGLE_THEME
        });
    });
});