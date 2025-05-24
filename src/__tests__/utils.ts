import { expect } from 'vitest';

function expectExportsExactly(
    module: Record<string, unknown>,
    expectedExports: string[],
): void {
    const keys = Object.keys(module);
    expect(keys.length).toBe(expectedExports.length);
    expectedExports.forEach(key => {
        expect(module[key]).toBeDefined();
    });
}

export { expectExportsExactly };
