import { MassUnit, Mass } from '../Mass';
import { describe, expect, it } from 'vitest';

describe('Mass', () => {
    it('should construct a Mass instance with standard units', () => {
        const mass = new Mass({ value: 1, unit: MassUnit.g });
        expect(mass.value).toBe(1);
        expect(mass.unit).toBe('g');
    });

    it('should construct a Mass instance with other units', () => {
        const mass = new Mass({ value: 1, unit: MassUnit.lb });
        expect(mass.value).toBe(1);
        expect(mass.unit).toBe('lb');
    });

    it('should convert between different mass units', () => {
        const massInGrams = new Mass({ value: 1000, unit: MassUnit.g });

        const massInPounds = massInGrams.convert(MassUnit.lb);
        expect(massInPounds.value).toBeCloseTo(2.20462, 5);
        expect(massInPounds.unit).toBe('lb');

        const massInOunces = massInGrams.convert(MassUnit.oz);
        expect(massInOunces.value).toBeCloseTo(35.27396, 5);
        expect(massInOunces.unit).toBe('oz');
    });
});
