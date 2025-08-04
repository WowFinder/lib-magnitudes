import { unitParser } from '../Parser';

import { describe, it, expect } from 'vitest';
import { lengthUnitsEnum } from './mocks';

describe('Parser utilities', () => {
    describe('unitParser', () => {
        it('should parse a valid unit', () => {
            const parseUnit = unitParser(lengthUnitsEnum);
            expect(parseUnit('m')).toBe('m');
            expect(parseUnit('ft')).toBe('ft');
            expect(parseUnit('inch')).toBe('inch');
        });

        it('should throw an error for an invalid unit', () => {
            const parseUnit = unitParser(lengthUnitsEnum);
            expect(() => parseUnit('invalid')).toThrowError(
                'Invalid unit: invalid',
            );
        });
    });
});
