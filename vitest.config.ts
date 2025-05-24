import { defineConfig } from 'vitest/config';
import { vitestTypescriptAssertPlugin } from 'vite-plugin-vitest-typescript-assert';

export default defineConfig({
    plugins: [vitestTypescriptAssertPlugin()],
    test: {
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov'],
            all: true,
            reportsDirectory: './coverage',
            include: ['src/**/*.{ts,tsx}'],
            exclude: [
                '**/node_modules/**',
                '**/__tests__/**',
                '**/__mocks__/**',
                '**/stories/**',
                '**/*.setup.ts',
                '**/*.config.ts',
            ],
            thresholds: {
                branches: 100,
                functions: 100,
                lines: 100,
                statements: 100,
            },
        },
    },
});

