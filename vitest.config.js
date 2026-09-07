import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true, // Enables global 'describe', 'test', 'expect' without importing them
  },
});