import {
    Speed,
    SpeedUnit,
    Time,
    TimeUnit,
    AccelerationUnit,
    Velocity,
} from '../../Magnitude';
import { speedPerTime } from '../Acceleration';
import { describe, expect, it } from 'vitest';

describe('Acceleration formulae', () => {
    describe('speedPerTime', () => {
        it('should calculate scalar acceleration correctly for Speed and Time in SI units', () => {
            const speed = new Speed({ value: 20, unit: SpeedUnit['m/s'] });
            const time = new Time({ value: 5, unit: TimeUnit.s });
            const acceleration = speedPerTime(speed, time);
            expect(acceleration).toBeDefined();
            expect(acceleration.value).toBe(4); // 20 m/s / 5 s
            expect(acceleration.unit).toBe(AccelerationUnit['m/s²']);
        });

        it('should calculate scalar acceleration correctly for Speed and Time in non-SI units', () => {
            const speed = new Speed({ value: 10000, unit: SpeedUnit['m/h'] }); // 2.77778 m/s
            const time = new Time({ value: 2, unit: TimeUnit.m }); // 120 s
            const acceleration = speedPerTime(speed, time);
            expect(acceleration).toBeDefined();
            expect(acceleration.value).toBeCloseTo(0.02315, 5); // 2.77778 m/s / 120 s
            expect(acceleration.unit).toBe(AccelerationUnit['m/s²']);
        });

        it('should calculate vector acceleration correctly for Velocity and Time in SI units', () => {
            const velocity = new Velocity({
                x: 10,
                y: 5,
                z: 2,
                unit: SpeedUnit['m/s'],
            });
            const time = new Time({ value: 2, unit: TimeUnit.s });
            const acceleration = speedPerTime(velocity, time);
            expect(acceleration).toBeDefined();
            expect(acceleration.x).toBe(5); // 10 m/s / 2 s
            expect(acceleration.y).toBe(2.5); // 5 m/s / 2 s
            expect(acceleration.z).toBe(1); // 2 m/s / 2 s
            expect(acceleration.unit).toBe(AccelerationUnit['m/s²']);
        });

        it('should calculate vector acceleration correctly for Velocity and Time in non-SI units', () => {
            const velocity = new Velocity({
                x: 36000,
                y: 18000,
                z: 9000,
                unit: SpeedUnit['m/h'], // 10 m/s, 5 m/s, 2.5 m/s
            });
            const time = new Time({ value: 3, unit: TimeUnit.m }); // 180 s
            const acceleration = speedPerTime(velocity, time);
            expect(acceleration).toBeDefined();
            expect(acceleration.x).toBeCloseTo(0.05556, 5); // 10 m/s / 180 s
            expect(acceleration.y).toBeCloseTo(0.02778, 5); // 5 m/s / 180 s
            expect(acceleration.z).toBeCloseTo(0.01389, 5); // 2.5 m/s / 180 s
            expect(acceleration.unit).toBe(AccelerationUnit['m/s²']);
        });
        it('should throw an error if time is zero', () => {
            const speed = new Speed({ value: 10, unit: SpeedUnit['m/s'] });
            const time = new Time({ value: 0, unit: TimeUnit.s });
            expect(() => speedPerTime(speed, time)).toThrow(
                /^Time cannot be zero/,
            );
        });
    });
});
