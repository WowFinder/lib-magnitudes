import { TimeUnit, Time } from '../Time';
import { describe, expect, it } from 'vitest';

describe('Time', () => {
    it('should construct a Time instance with standard units', () => {
        const time = new Time({ value: 1, unit: TimeUnit.s });
        expect(time.value).toBe(1);
        expect(time.unit).toBe('s');
    });
    it('should construct a Time instance with other units', () => {
        const time = new Time({ value: 1, unit: TimeUnit.m });
        expect(time.value).toBe(1);
        expect(time.unit).toBe('m');
    });
    it('should convert between different time units', () => {
        const timeInSeconds = new Time({ value: 3600, unit: TimeUnit.s });
        const timeInMinutes = timeInSeconds.convert(TimeUnit.m);
        expect(timeInMinutes.value).toBe(60);
        expect(timeInMinutes.unit).toBe('m');

        const timeInHours = timeInSeconds.convert(TimeUnit.h);
        expect(timeInHours.value).toBe(1);
        expect(timeInHours.unit).toBe('h');

        const timeInDays = timeInSeconds.convert(TimeUnit.d);
        expect(timeInDays.value).toBeCloseTo(1 / 24);
        expect(timeInDays.unit).toBe('d');
    });
});
