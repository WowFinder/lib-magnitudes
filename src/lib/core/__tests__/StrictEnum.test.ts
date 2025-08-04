import { type KeyAsValueObject, assertIsValidKey } from '../StrictEnum';
import { describe, it, expect } from 'vitest';
import {
    expectAssignable,
    expectNotAssignable,
} from 'vite-plugin-vitest-typescript-assert/tsd';
import { invalidUnitsEnum, lengthUnitsEnum } from './mocks';

describe('StrictEnum types and methods', () => {
    describe('KeyAsValueObject', () => {
        it('should allow a correctly-formed enum', () => {
            expectAssignable<KeyAsValueObject<keyof typeof lengthUnitsEnum>>(
                lengthUnitsEnum,
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
