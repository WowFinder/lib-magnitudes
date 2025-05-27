import { fillDimensionality } from '../../../core';
import { Velocity, Speed, SpeedUnit, assertIsSpeedUnitKey } from '../Velocity';
import { describe, expect, it } from 'vitest';

describe('Speed and Velocity classes', () => {
    describe('Speed', () => {
        it('should have the correct dimensions', () => {
            expect(Speed.dimensions).toEqual(
                fillDimensionality({ L: 1, T: -1 }),
            );
        });

        describe('assertIsSpeedUnitKey', () => {
            it('should return true for valid SpeedUnit keys', () => {
                expect(() => assertIsSpeedUnitKey('m/s')).not.toThrow();
                expect(() => assertIsSpeedUnitKey('mile/h')).not.toThrow();
                expect(() => assertIsSpeedUnitKey('ft/s')).not.toThrow();
            });

            it('should throw an error for invalid SpeedUnit keys', () => {
                expect(() => assertIsSpeedUnitKey('invalid')).toThrow(
                    'Invalid SpeedUnit key: invalid',
                );
            });
        });

        it('should construct a Speed instance with standard units', () => {
            const speed = new Speed({ value: 1, unit: SpeedUnit['m/s'] });
            expect(speed.value).toBe(1);
            expect(speed.unit).toBe(SpeedUnit['m/s']);
        });

        it('should convert between different speed units', () => {
            const speedInMetersPerSecond = new Speed({
                value: 1,
                unit: SpeedUnit['m/s'],
            });

            const speedInMilesPerHour = speedInMetersPerSecond.convert(
                SpeedUnit['mile/h'],
            );
            expect(speedInMilesPerHour.value).toBeCloseTo(2.23694, 3);
            expect(speedInMilesPerHour.unit).toBe(SpeedUnit['mile/h']);

            const speedInFeetPerSecond = speedInMetersPerSecond.convert(
                SpeedUnit['ft/s'],
            );
            expect(speedInFeetPerSecond.value).toBeCloseTo(3.28084, 3);
            expect(speedInFeetPerSecond.unit).toBe(SpeedUnit['ft/s']);
        });
    });

    describe('Velocity', () => {
        it('should have the correct dimensions', () => {
            expect(Velocity.dimensions).toEqual(
                fillDimensionality({ L: 1, T: -1 }),
            );
        });

        it('should construct a Velocity instance with default values', () => {
            const velocity = new Velocity({});
            expect(velocity.x).toBe(0);
            expect(velocity.y).toBe(0);
            expect(velocity.z).toBe(0);
            expect(velocity.unit).toBe(SpeedUnit['m/s']);
        });

        it('should construct a Velocity instance with standard units', () => {
            const velocity = new Velocity({
                x: 1,
                y: 2,
                z: 3,
                unit: SpeedUnit['m/s'],
            });
            expect(velocity.x).toBe(1);
            expect(velocity.y).toBe(2);
            expect(velocity.z).toBe(3);
            expect(velocity.unit).toBe(SpeedUnit['m/s']);
        });

        it('should convert between different velocity units', () => {
            const velocityInMetersPerSecond = new Velocity({
                x: 1,
                unit: SpeedUnit['m/s'],
            });

            const velocityInMilesPerHour = velocityInMetersPerSecond.convert(
                SpeedUnit['mile/h'],
            );
            expect(velocityInMilesPerHour.x).toBeCloseTo(2.23694, 3);
            expect(velocityInMilesPerHour.unit).toBe(SpeedUnit['mile/h']);

            const velocityInFeetPerSecond = velocityInMetersPerSecond.convert(
                SpeedUnit['ft/s'],
            );
            expect(velocityInFeetPerSecond.x).toBeCloseTo(3.28084, 3);
            expect(velocityInFeetPerSecond.unit).toBe(SpeedUnit['ft/s']);
        });

        it('should compute the magnitude of the vector correctly', () => {
            const velocity = new Velocity({
                x: 3,
                y: 4,
                z: 0,
                unit: SpeedUnit['m/s'],
            });
            const speed = velocity.magnitude;
            expect(speed.value).toBeCloseTo(5, 5);
            expect(speed.unit).toBe(SpeedUnit['m/s']);
        });
    });
});
