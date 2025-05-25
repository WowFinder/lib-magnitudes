import { fillDimensionality } from '../../../core';
import { Speed, SpeedUnit, assertIsSpeedUnitKey } from '../Speed';
import { describe, expect, it } from 'vitest';

describe('Speed', () => {
    it('should have the correct dimensions', () => {
        expect(Speed.dimensions).toEqual(fillDimensionality({ L: 1, T: -1 }));
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
