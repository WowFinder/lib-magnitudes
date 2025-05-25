import { fillDimensionality } from '../../../core';
import {
    ScalarAcceleration,
    ScalarAccelerationUnit,
    assertIsScalarAccelerationUnitKey,
} from '../ScalarAcceleration';
import { describe, expect, it } from 'vitest';

describe('ScalarAcceleration', () => {
    it('should have the correct dimensions', () => {
        expect(ScalarAcceleration.dimensions).toEqual(
            fillDimensionality({ L: 1, T: -2 }),
        );
    });

    describe('assertIsScalarAccelerationUnitKey', () => {
        it('should return true for valid ScalarAccelerationUnit keys', () => {
            expect(() =>
                assertIsScalarAccelerationUnitKey('m/s²'),
            ).not.toThrow();
            expect(() =>
                assertIsScalarAccelerationUnitKey('mile/h²'),
            ).not.toThrow();
            expect(() =>
                assertIsScalarAccelerationUnitKey('ft/s²'),
            ).not.toThrow();
        });

        it('should throw an error for invalid ScalarAccelerationUnit keys', () => {
            expect(() => assertIsScalarAccelerationUnitKey('invalid')).toThrow(
                'Invalid ScalarAccelerationUnit key: invalid',
            );
        });
    });

    it('should construct a ScalarAcceleration instance with standard units', () => {
        const acceleration = new ScalarAcceleration({
            value: 1,
            unit: 'm/s²',
        });
        expect(acceleration.value).toBe(1);
        expect(acceleration.unit).toBe(ScalarAccelerationUnit['m/s²']);
    });

    it('should convert between different acceleration units', () => {
        const accelerationInMetersPerSecondSquared = new ScalarAcceleration({
            value: 1,
            unit: 'm/s²',
        });

        const accelerationInMilesPerHourSquared =
            accelerationInMetersPerSecondSquared.convert('mile/h²');
        expect(accelerationInMilesPerHourSquared.value).toBeCloseTo(8052.97, 2);
        expect(accelerationInMilesPerHourSquared.unit).toBe('mile/h²');

        const accelerationInFeetPerSecondSquared =
            accelerationInMetersPerSecondSquared.convert('ft/s²');
        expect(accelerationInFeetPerSecondSquared.value).toBeCloseTo(
            3.28084,
            5,
        );
        expect(accelerationInFeetPerSecondSquared.unit).toBe('ft/s²');
    });
});
