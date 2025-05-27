import { fillDimensionality } from '../../../core';
import {
    Acceleration,
    AccelerationUnit,
    assertIsAccelerationUnitKey,
    ScalarAcceleration,
} from '../Acceleration';
import { describe, expect, it } from 'vitest';

describe('Acceleration classes', () => {
    describe('ScalarAcceleration', () => {
        it('should have the correct dimensions', () => {
            expect(ScalarAcceleration.dimensions).toEqual(
                fillDimensionality({ L: 1, T: -2 }),
            );
        });

        describe('assertIsAccelerationUnitKey', () => {
            it('should return true for valid AccelerationUnit keys', () => {
                expect(() => assertIsAccelerationUnitKey('m/s²')).not.toThrow();
                expect(() =>
                    assertIsAccelerationUnitKey('mile/h²'),
                ).not.toThrow();
                expect(() =>
                    assertIsAccelerationUnitKey('ft/s²'),
                ).not.toThrow();
            });

            it('should throw an error for invalid AccelerationUnit keys', () => {
                expect(() => assertIsAccelerationUnitKey('invalid')).toThrow(
                    'Invalid AccelerationUnit key: invalid',
                );
            });
        });

        it('should construct a ScalarAcceleration instance with standard units', () => {
            const acceleration = new ScalarAcceleration({
                value: 1,
                unit: 'm/s²',
            });
            expect(acceleration.value).toBe(1);
            expect(acceleration.unit).toBe(AccelerationUnit['m/s²']);
        });

        it('should convert between different acceleration units', () => {
            const accelerationInMetersPerSecondSquared = new ScalarAcceleration(
                {
                    value: 1,
                    unit: 'm/s²',
                },
            );

            const accelerationInMilesPerHourSquared =
                accelerationInMetersPerSecondSquared.convert('mile/h²');
            expect(accelerationInMilesPerHourSquared.value).toBeCloseTo(
                8052.97,
                2,
            );
            expect(accelerationInMilesPerHourSquared.unit).toBe('mile/h²');

            const accelerationInYardsPerMinutePerSecond =
                accelerationInMetersPerSecondSquared.convert('yd/m/s');
            expect(accelerationInYardsPerMinutePerSecond.value).toBeCloseTo(
                65.6167979,
                5,
            );
            expect(accelerationInYardsPerMinutePerSecond.unit).toBe('yd/m/s');

            const accelerationInFeetPerSecondSquared =
                accelerationInMetersPerSecondSquared.convert('ft/s²');
            expect(accelerationInFeetPerSecondSquared.value).toBeCloseTo(
                3.28084,
                5,
            );
            expect(accelerationInFeetPerSecondSquared.unit).toBe('ft/s²');
        });
    });
    describe('Acceleration', () => {
        it('should have the correct dimensions', () => {
            expect(Acceleration.dimensions).toEqual(
                fillDimensionality({ L: 1, T: -2 }),
            );
        });

        it('should construct an Acceleration instance with default values', () => {
            const acceleration = new Acceleration({});
            expect(acceleration.x).toBe(0);
            expect(acceleration.y).toBe(0);
            expect(acceleration.z).toBe(0);
            expect(acceleration.unit).toBe(AccelerationUnit['m/s²']);
        });

        it('should construct an Acceleration instance with standard units', () => {
            const acceleration = new Acceleration({
                x: 1,
                y: 2,
                z: 3,
                unit: AccelerationUnit['m/s²'],
            });
            expect(acceleration.x).toBe(1);
            expect(acceleration.y).toBe(2);
            expect(acceleration.z).toBe(3);
            expect(acceleration.unit).toBe(AccelerationUnit['m/s²']);
        });

        it('should convert between different acceleration units', () => {
            const accelerationInMetersPerSecondSquared = new Acceleration({
                x: 1,
                unit: AccelerationUnit['m/s²'],
            });

            const accelerationInMilesPerHourSquared =
                accelerationInMetersPerSecondSquared.convert(
                    AccelerationUnit['mile/h²'],
                );
            expect(accelerationInMilesPerHourSquared.x).toBeCloseTo(8052.97, 2);
            expect(accelerationInMilesPerHourSquared.unit).toBe(
                AccelerationUnit['mile/h²'],
            );

            const accelerationInFeetPerSecondSquared =
                accelerationInMetersPerSecondSquared.convert(
                    AccelerationUnit['ft/s²'],
                );
            expect(accelerationInFeetPerSecondSquared.x).toBeCloseTo(
                3.28084,
                5,
            );
            expect(accelerationInFeetPerSecondSquared.unit).toBe(
                AccelerationUnit['ft/s²'],
            );
        });
        it('should compute the magnitude of the vector correctly', () => {
            const acceleration = new Acceleration({
                x: 3,
                y: 4,
                z: 0,
                unit: AccelerationUnit['m/s²'],
            });
            const magnitude = acceleration.magnitude;
            expect(magnitude.value).toBeCloseTo(5, 5);
            expect(magnitude.unit).toBe(AccelerationUnit['m/s²']);
        });
    });
});
