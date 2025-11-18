import { fillDimensionality } from '../../../core';
import {
    ElectricResistanceUnit,
    ElectricResistance,
} from '../ElectricResistance';
import { describe, expect, it } from 'vitest';

describe('ElectricResistance', () => {
    it('should have the correct dimensions', () => {
        expect(ElectricResistance.dimensions).toEqual(
            fillDimensionality({ M: 1, L: 2, T: -3, I: -2 }),
        );
    });
    it('should construct an ElectricResistance instance with standard units', () => {
        const resistance = new ElectricResistance({
            value: 1,
            unit: ElectricResistanceUnit.Ω,
        });
        expect(resistance.value).toBe(1);
        expect(resistance.unit).toBe('Ω');
    });
    it('should convert between different electric resistance units', () => {
        const resistanceInOhms = new ElectricResistance({
            value: 1,
            unit: ElectricResistanceUnit.Ω,
        });

        const resistanceInOhmsConverted = resistanceInOhms.convert(
            ElectricResistanceUnit.Ω,
        );
        expect(resistanceInOhmsConverted.value).toBe(1);
        expect(resistanceInOhmsConverted.unit).toBe(ElectricResistanceUnit.Ω);
    });
});
