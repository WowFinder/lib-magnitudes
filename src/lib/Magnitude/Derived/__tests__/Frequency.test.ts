import { fillDimensionality } from '../../../core';
import { FrequencyUnit, Frequency } from '../Frequency';
import { describe, expect, it } from 'vitest';

describe('Frequency', () => {
    it('should have the correct dimensions', () => {
        expect(Frequency.dimensions).toEqual(fillDimensionality({ T: -1 }));
    });
    it('should construct a Frequency instance with standard units', () => {
        const frequency = new Frequency({ value: 1, unit: FrequencyUnit.Hz });
        expect(frequency.value).toBe(1);
        expect(frequency.unit).toBe('Hz');
    });
});
