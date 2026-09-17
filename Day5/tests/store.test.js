import { describe, it, expect, vi } from "vitest";
import { createStore } from "../store.js";

describe("createStore", () => {
    it("returns the initial state", () => {
        const reducer = (state = { count: 0 }) => state;

        const store = createStore(reducer, { count: 0 });

        expect(store.getState()).toEqual({ count: 0 });
    });

    it("updates state when an action is dispatched", () => {
        const reducer = (state = { count: 0 }, action) => {
            if (action.type === "INCREMENT") {
                return { count: state.count + 1 };
            }

            return state;
        };

        const store = createStore(reducer, { count: 0 });

        store.dispatch({ type: "INCREMENT" });

        expect(store.getState().count).toBe(1);
    });

    it("notifies subscribers when state changes", () => {
        const reducer = (state = { count: 0 }, action) => {
            if (action.type === "INCREMENT") {
                return { count: state.count + 1 };
            }

            return state;
        };

        const store = createStore(reducer, { count: 0 });

        const listener = vi.fn();

        store.subscribe(listener);

        store.dispatch({ type: "INCREMENT" });

        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("allows a subscriber to unsubscribe", () => {
        const reducer = (state = { count: 0 }, action) => {
            if (action.type === "INCREMENT") {
                return { count: state.count + 1 };
            }

            return state;
        };

        const store = createStore(reducer, { count: 0 });

        const listener = vi.fn();

        const unsubscribe = store.subscribe(listener);

        unsubscribe();

        store.dispatch({ type: "INCREMENT" });

        expect(listener).not.toHaveBeenCalled();
    });

    it("does not notify subscribers when the reducer returns the same state", () => {
        const reducer = (state = { count: 0 }) => state;

        const store = createStore(reducer, { count: 0 });

        const listener = vi.fn();

        store.subscribe(listener);

        store.dispatch({ type: "UNKNOWN" });

        expect(listener).not.toHaveBeenCalled();
    });

    it("supports middleware", () => {
        const reducer = (state = { count: 0 }, action) => {
            if (action.type === "INCREMENT") {
                return { count: state.count + 1 };
            }

            return state;
        };

        const middleware = vi.fn(() => next => action => {
            return next(action);
        });

        const store = createStore(
            reducer,
            { count: 0 },
            [middleware]
        );

        store.dispatch({ type: "INCREMENT" });

        expect(middleware).toHaveBeenCalledTimes(1);
        expect(store.getState().count).toBe(1);
    });
});