import { Time, TimeUnit } from '../../Magnitude';
import { frequencyFromTime } from '../Frequency';
import { describe, expect, it } from 'vitest';

describe('Frequency formulae', () => {
    describe('frequencyFromTime', () => {
        it('should calculate frequency correctly for values in SI units', () => {
            const time = new Time({
                value: 0.5,
                unit: TimeUnit.s,
            });
            const frequency = frequencyFromTime(time);
            expect(frequency.value).toBeDefined();
            expect(frequency.value).toBeCloseTo(2); // Hz
            expect(frequency.unit).toBe('Hz');
        });
        it('should throw if time is zero', () => {
            const time = new Time({
                value: 0,
                unit: TimeUnit.s,
            });
            expect(() => frequencyFromTime(time)).toThrow(
                /^Time cannot be zero/,
            );
        });
    });
});
