import { fillDimensionality } from '../../../core';
import { Velocity } from '../Velocity';
import { SpeedUnit } from '../Speed';
import { describe, expect, it } from 'vitest';

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
