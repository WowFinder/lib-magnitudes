import { fillDimensionality } from '../../../core';
import { CapacitanceUnit, Capacitance } from '../Capacitance';
import { describe, expect, it } from 'vitest';

describe('Capacitance', () => {
    it('should have the correct dimensions', () => {
        expect(Capacitance.dimensions).toEqual(
            fillDimensionality({ M: -1, L: -2, T: 4, I: 2 }),
        );
    });
    it('should construct a Capacitance instance with standard units', () => {
        const capacitance = new Capacitance({
            value: 1,
            unit: CapacitanceUnit.F,
        });
        expect(capacitance.value).toBe(1);
        expect(capacitance.unit).toBe('F');
    });
    it('should convert between different capacitance units', () => {
        const capacitanceInFarads = new Capacitance({
            value: 1,
            unit: CapacitanceUnit.F,
        });

        const capacitanceInMicrofarads = capacitanceInFarads.convert(
            CapacitanceUnit.F,
        );
        expect(capacitanceInMicrofarads.value).toBe(1);
        expect(capacitanceInMicrofarads.unit).toBe(CapacitanceUnit.F);
    });
});
