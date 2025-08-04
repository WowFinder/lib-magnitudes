import { fillDimensionality } from '../../../core';
import { LuminousIntensityUnit, LuminousIntensity } from '../LuminousIntensity';
import { describe, expect, it } from 'vitest';

describe('LuminousIntensity', () => {
    it('should have the correct dimensions', () => {
        expect(LuminousIntensity.dimensions).toEqual(
            fillDimensionality({ J: 1 }),
        );
    });

    it('should construct a LuminousIntensity instance with standard units', () => {
        const intensity = new LuminousIntensity({
            value: 1,
            unit: LuminousIntensityUnit.cd,
        });
        expect(intensity).toBeInstanceOf(LuminousIntensity);
        expect(intensity.value).toBe(1);
        expect(intensity.unit).toBe('cd');
    });

    it('should convert between luminous intensity units', () => {
        const intensityInCandelas = new LuminousIntensity({
            value: 1,
            unit: LuminousIntensityUnit.cd,
        });

        const convertedIntensity = intensityInCandelas.convert(
            LuminousIntensityUnit.cd,
        );
        expect(convertedIntensity.value).toBe(1);
        expect(convertedIntensity.unit).toBe('cd');
    });
});
