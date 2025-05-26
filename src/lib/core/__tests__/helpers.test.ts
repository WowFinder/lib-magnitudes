import {
    unitParser,
    type KeyAsValueObject,
    assertIsValidKey,
} from '../helpers';
import { describe, it, expect } from 'vitest';
import {
    expectAssignable,
    expectNotAssignable,
} from 'vite-plugin-vitest-typescript-assert/tsd';

describe('Core helpers', () => {
    const lengthUnitsEnum = {
        m: 'm',
        ft: 'ft',
        inch: 'inch',
    } as const;

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

    describe('KeyAsValueObject', () => {
        const invalidUnitsEnum = {
            m: 'm',
            ft: "'",
        } as const;
        it('should create an object with keys as values', () => {
            expect(lengthUnitsEnum.m).toBe('m');
            expect(lengthUnitsEnum.ft).toBe('ft');
            expect(lengthUnitsEnum.inch).toBe('inch');
        });
        it('should allow a correctly-formed enum', () => {
            const validUnitsEnum = {
                m: 'm',
                ft: 'ft',
                inch: 'inch',
            } as const;
            expectAssignable<KeyAsValueObject<keyof typeof validUnitsEnum>>(
                validUnitsEnum,
            );
        });
        it('should not allow an incorrectly-formed enum', () => {
            expectNotAssignable<
                KeyAsValueObject<keyof typeof invalidUnitsEnum>
                // @ts-expect-error
            >(invalidUnitsEnum);
        });
    });

    describe('assertIsValidKey', () => {
        it('should not throw for a valid key', () => {
            expect(() => assertIsValidKey('m', lengthUnitsEnum)).not.toThrow();
            expect(() => assertIsValidKey('ft', lengthUnitsEnum)).not.toThrow();
            expect(() =>
                assertIsValidKey('inch', lengthUnitsEnum),
            ).not.toThrow();
        });

        it('should throw for an invalid key', () => {
            expect(() => assertIsValidKey('invalid', lengthUnitsEnum)).toThrow(
                'Invalid key: invalid',
            );
        });
    });
});
