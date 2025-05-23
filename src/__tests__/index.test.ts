import { testable } from '../index';
import { describe, it, expect } from 'vitest';

describe('testable function', () => {
    it('should return "testable"', () => {
        expect(testable()).toBe('testable');
    });
});
