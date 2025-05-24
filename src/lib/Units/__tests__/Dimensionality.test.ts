import {
    matchPartialDimensionalities,
    type DimensionalityBuilder,
} from '../Dimensionality';
import { describe, it, expect } from 'vitest';

describe('Dimensionality', () => {
    const lengthDimensionality: DimensionalityBuilder = {
        L: 1,
    } as const;

    const torqueDimensionality: DimensionalityBuilder = {
        L: 2,
        M: 1,
        T: -2,
        α: 1,
    } as const;

    const spectralRadianceDimensionality: DimensionalityBuilder = {
        L: -2,
        M: 0,
        T: 1,
        α: -2,
    } as const;

    const angularFrequencyDimensionality: DimensionalityBuilder = {
        T: -1,
        α: 1,
    } as const;
    describe('matchPartialDimensionalities', () => {
        it('should return true for matching dimensionalities', () => {
            expect(
                matchPartialDimensionalities(
                    lengthDimensionality,
                    lengthDimensionality,
                ),
            ).toBe(true);
        });
        it('should return true for no arguments', () => {
            expect(matchPartialDimensionalities()).toBe(true);
        });
        it('should return false for non-matching dimensionalities', () => {
            expect(
                matchPartialDimensionalities(
                    lengthDimensionality,
                    torqueDimensionality,
                    spectralRadianceDimensionality,
                    angularFrequencyDimensionality,
                ),
            ).toBe(false);
        });
    });
});
