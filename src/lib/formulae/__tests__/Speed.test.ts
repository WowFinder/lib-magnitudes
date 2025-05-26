import {
    Length,
    LengthUnit,
    Time,
    TimeUnit,
    SpeedUnit,
    Position,
} from '../../Magnitude';
import { distancePerTime } from '../Speed';
import { describe, expect, it } from 'vitest';

describe('Speed formulae', () => {
    describe('distancePerTime', () => {
        it('should calculate speed correctly for Length and Time in SI units', () => {
            const distance = new Length({ value: 100, unit: LengthUnit.m });
            const time = new Time({ value: 10, unit: TimeUnit.s });
            const speed = distancePerTime(distance, time);
            expect(speed).toBeDefined();
            expect(speed.value).toBe(10);
            expect(speed.unit).toBe(SpeedUnit['m/s']);
        });

        it('should calculate speed correctly for Length and Time in non-SI units', () => {
            const distance = new Length({ value: 5000, unit: LengthUnit.in }); // 127m
            const time = new Time({ value: 2, unit: TimeUnit.m }); // 120s
            const speed = distancePerTime(distance, time);
            expect(speed).toBeDefined();
            expect(speed.value).toBeCloseTo(1.05833, 5); // 127m / 120s = 1.05833 m/s
            expect(speed.unit).toBe(SpeedUnit['m/s']);
        });

        it('should calculate velocity correctly for Position and Time in SI units', () => {
            const position = new Position({
                x: 100,
                y: 50,
                z: 25,
                unit: LengthUnit.m,
            });
            const time = new Time({ value: 5, unit: TimeUnit.s });
            const velocity = distancePerTime(position, time);
            expect(velocity).toBeDefined();
            expect(velocity.x).toBe(20);
            expect(velocity.y).toBe(10);
            expect(velocity.z).toBe(5);
            expect(velocity.unit).toBe(SpeedUnit['m/s']);
        });

        it('should calculate velocity correctly for Position and Time in non-SI units', () => {
            const position = new Position({
                x: 2000,
                y: 1000,
                z: 500,
                unit: LengthUnit.in, // 50.8m, 25.4m, 12.7m
            });
            const time = new Time({ value: 10, unit: TimeUnit.m }); // 600s
            const velocity = distancePerTime(position, time);
            expect(velocity).toBeDefined();
            expect(velocity.x).toBeCloseTo(0.08467, 5); // 50.8m / 600s
            expect(velocity.y).toBeCloseTo(0.04233, 5); // 25.4m / 600s
            expect(velocity.z).toBeCloseTo(0.02117, 5); // 12.7m / 600s
            expect(velocity.unit).toBe(SpeedUnit['m/s']);
        });

        it('should throw if time is zero', () => {
            const distance = new Length({ value: 100, unit: LengthUnit.m });
            const time = new Time({ value: 0, unit: TimeUnit.s });
            expect(() => distancePerTime(distance, time)).toThrow(
                /^Time cannot be zero/,
            );
        });
    });
});
