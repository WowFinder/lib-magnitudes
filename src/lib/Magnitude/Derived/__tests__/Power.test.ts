import { fillDimensionality } from '../../../core';
import { PowerUnit, Power } from '../Power';
import { describe, expect, it } from 'vitest';

describe('Power', () => {
    it('should have the correct dimensions', () => {
        expect(Power.dimensions).toEqual(
            fillDimensionality({ M: 1, L: 2, T: -3 }),
        );
    });
    it('should construct a Power instance with standard units', () => {
        const power = new Power({
            value: 1,
            unit: PowerUnit.W,
        });
        expect(power.value).toBe(1);
        expect(power.unit).toBe('W');
    });

    it('should convert between different power units', () => {
        const powerInWatts = new Power({
            value: 1,
            unit: PowerUnit.W,
        });

        const converted = powerInWatts.convert(PowerUnit.W);
        expect(converted.value).toBe(1);
        expect(converted.unit).toBe('W');
    });
});
