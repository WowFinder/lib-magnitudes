import { defineUnit } from '../Unit';

import { describe, it, expect } from 'vitest';
const zeroUnit = defineUnit({
    dimensionality: {},
    symbol: '0',
});
const gram = defineUnit({
    dimensionality: { M: 1 },
    symbol: 'g',
    conversionFactor: 0.001, // grams to kilograms
});
const pound = defineUnit({
    dimensionality: { M: 1 },
    symbol: 'lb',
    conversionFactor: 453.59237, // pounds to grams
    conversionTargetUnit: gram,
});

describe('Unit', () => {
    describe('defineUnit', () => {
        it('should create a unit with minimal properties', () => {
            expect(zeroUnit).toBeDefined();
            expect(zeroUnit.dimensionality.L).toEqual(0);
            expect(zeroUnit.baseConversionFactor).toEqual(1);
            expect(zeroUnit.symbol).toEqual('0');
            expect(zeroUnit.toString()).toEqual('0');
        });
        it('should create units with full properties', () => {
            expect(pound).toBeDefined();
            expect(pound.dimensionality.M).toEqual(1);
            expect(pound.baseConversionFactor).toBeCloseTo(0.45359237, 1e-8);
            expect(pound.symbol).toEqual('lb');
            expect(pound.toString()).toEqual('lb');
        });
        it('should throw an error for dimensionality mismatch', () => {
            const badPoundSpec = {
                dimensionality: { M: 1, L: 1 }, // Incorrect dimensionality
                symbol: 'bad-lb',
                conversionFactor: 453.59237,
                conversionTargetUnit: gram,
            };
            expect(() => defineUnit(badPoundSpec)).toThrow(
                /^Dimensionality mismatch: /,
            );
        });
    });
});
