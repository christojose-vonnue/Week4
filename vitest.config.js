import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true, // Enables global 'describe', 'test', 'expect' without importing them
  },
});