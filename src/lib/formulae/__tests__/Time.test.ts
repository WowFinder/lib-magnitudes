import { Frequency, FrequencyUnit } from '../../Magnitude';
import { periodFromFrequency } from '../Time';
import { describe, expect, it } from 'vitest';

describe('Time formulae', () => {
    describe('periodFromFrequency', () => {
        it('should calculate period correctly for values in SI units', () => {
            const frequency = new Frequency({
                value: 2,
                unit: FrequencyUnit.Hz,
            });
            const period = periodFromFrequency(frequency);
            expect(period.value).toBeDefined();
            expect(period.value).toBeCloseTo(0.5); // seconds
            expect(period.unit).toBe('s');
        });
        it('should throw if frequency is zero', () => {
            const frequency = new Frequency({
                value: 0,
                unit: FrequencyUnit.Hz,
            });
            expect(() => periodFromFrequency(frequency)).toThrow(
                /^Frequency cannot be zero/,
            );
        });
    });
});
