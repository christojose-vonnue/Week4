// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from "vitest";
import { matchRoute, createRouter } from "../router.js";

describe("matchRoute", () => {
    it("matches a static route", () => {
        const result = matchRoute("/list", "/list");

        expect(result.isMatch).toBe(true);
        expect(result.params).toEqual({});
    });

    it("does not match an incorrect route", () => {
        const result = matchRoute("/list", "/settings");

        expect(result.isMatch).toBe(false);
        expect(result.params).toEqual({});
    });

    it("matches a dynamic route and extracts the id", () => {
        const result = matchRoute("/detail/:id", "/detail/123");

        expect(result.isMatch).toBe(true);
        expect(result.params).toEqual({
            id: "123"
        });
    });
});


describe("createRouter", () => {
    let store;
    let router;

    beforeEach(() => {
        window.history.pushState({}, "", "/");

        store = {
            dispatch: vi.fn()
        };

        router = createRouter(store);
    });

    it("registers and resolves a route", () => {
        const component = vi.fn();

        router.register("/list", component);

        const result = router.resolve("/list");

        expect(result).not.toBeNull();
        expect(result.component).toBe(component);
        expect(result.params).toEqual({});
    });

    it("resolves a dynamic route", () => {
        const component = vi.fn();

        router.register("/detail/:id", component);

        const result = router.resolve("/detail/123");

        expect(result).not.toBeNull();
        expect(result.component).toBe(component);
        expect(result.params).toEqual({
            id: "123"
        });
    });

    it("returns null for an unknown route", () => {
        router.register("/list", vi.fn());

        const result = router.resolve("/unknown");

        expect(result).toBeNull();
    });

    it("navigates to a registered route", () => {
        const component = vi.fn();

        router.register("/list", component);

        router.navigate("/list");

        expect(store.dispatch).toHaveBeenCalledWith({
            type: "NAVIGATE",
            payload: {
                path: "/list",
                rawPath: "/list",
                params: {}
            }
        });

        expect(window.location.pathname).toBe("/list");
    });

    it("navigates to a dynamic route and passes params", () => {
        router.register("/detail/:id", vi.fn());

        router.navigate("/detail/123");

        expect(store.dispatch).toHaveBeenCalledWith({
            type: "NAVIGATE",
            payload: {
                path: "/detail/:id",
                rawPath: "/detail/123",
                params: {
                    id: "123"
                }
            }
        });
    });

    it("does not navigate to an unknown route", () => {
        const consoleSpy = vi
            .spyOn(console, "warn")
            .mockImplementation(() => {});

        router.navigate("/does-not-exist");

        expect(store.dispatch).not.toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it("handles popstate navigation", () => {
        router.register("/list", vi.fn());

        window.history.pushState({}, "", "/list");

        window.dispatchEvent(new PopStateEvent("popstate"));

        expect(store.dispatch).toHaveBeenCalledWith({
            type: "NAVIGATE",
            payload: {
                path: "/list",
                rawPath: "/list",
                params: {}
            }
        });
    });
});