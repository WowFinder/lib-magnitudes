import { expect } from 'vitest';

function expectModuleHasKey(
    module: Record<string, unknown>,
    key: string,
): void {
    if (!(key in module)) {
        throw new Error(`Expected module to have key: ${key}`);
    }
    expect(module[key]).toBeDefined();
}

function expectExportsExactly(
    module: Record<string, unknown>,
    expectedExports: string[],
): void {
    const keys = Object.keys(module);
    expectedExports.forEach(key => expectModuleHasKey(module, key));
    expect(keys.length).toBe(expectedExports.length);
}

function expectExportsAtLeast(
    module: Record<string, unknown>,
    expectedExports: string[],
): void {
    const keys = Object.keys(module);
    expect(keys.length).toBeGreaterThanOrEqual(expectedExports.length);
    expectedExports.forEach(key => expectModuleHasKey(module, key));
}

export { expectExportsExactly, expectExportsAtLeast };
