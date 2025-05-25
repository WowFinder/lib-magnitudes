import { fillDimensionality } from '../../../Units';
import { EnergyUnit, Energy } from '../Energy';
import { describe, expect, it } from 'vitest';

describe('Energy', () => {
    it('should have the correct dimensions', () => {
        expect(Energy.dimensions).toEqual(
            fillDimensionality({ M: 1, L: 2, T: -2 }),
        );
    });
    it('should construct an Energy instance with standard units', () => {
        const energy = new Energy({ value: 1, unit: EnergyUnit.J });
        expect(energy.value).toBe(1);
        expect(energy.unit).toBe('J');
    });
    it('should construct an Energy instance with other units', () => {
        const energy = new Energy({ value: 1, unit: EnergyUnit.Wh });
        expect(energy.value).toBe(1);
        expect(energy.unit).toBe('Wh');
    });
    it('should convert between different energy units', () => {
        const energyInWh = new Energy({ value: 1, unit: EnergyUnit.Wh });
        const energyInJoules = energyInWh.convert(EnergyUnit.J);
        expect(energyInJoules.value).toBeCloseTo(3600, 3);
        expect(energyInJoules.unit).toBe('J');
    });
});
