import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        clearMocks: true,
        setupFiles: './tests/setup.js',
    },
});