import vitest from 'eslint-plugin-vitest';

export default [
  {
    files: ['**/*.test.js'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/no-identical-title': 'off' // <-- Disables identical test title checks
    },
  },
];