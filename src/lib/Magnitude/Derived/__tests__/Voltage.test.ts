import { fillDimensionality } from '../../../core';
import { VoltageUnit, Voltage } from '../Voltage';
import { describe, it, expect } from 'vitest';

describe('Voltage', () => {
    it('should have the correct dimensions', () => {
        expect(Voltage.dimensions).toEqual(
            fillDimensionality({ M: 1, L: 2, T: -3, I: -1 }),
        );
    });
    it('should construct a Voltage instance with standard units', () => {
        const voltage = new Voltage({
            value: 1,
            unit: VoltageUnit.V,
        });
        expect(voltage.value).toBe(1);
        expect(voltage.unit).toBe('V');
    });

    it('should convert between different voltage units', () => {
        const voltageInVolts = new Voltage({
            value: 1,
            unit: VoltageUnit.V,
        });

        const converted = voltageInVolts.convert(VoltageUnit.V);
        expect(converted.value).toBe(1);
        expect(converted.unit).toBe('V');
    });
});
