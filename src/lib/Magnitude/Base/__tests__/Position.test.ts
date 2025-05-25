import { fillDimensionality } from '../../../core';
import { Position } from '../Position';
import { LengthUnit } from '../Length';
import { describe, expect, it } from 'vitest';

describe('Position', () => {
    it('should have the correct dimensions', () => {
        expect(Position.dimensions).toEqual(fillDimensionality({ L: 1 }));
    });

    it('should construct a Position instance with default values', () => {
        const position = new Position({});
        expect(position.x).toBe(0);
        expect(position.y).toBe(0);
        expect(position.z).toBe(0);
        expect(position.unit).toBe(LengthUnit.m);
    });

    it('should construct a Position instance with standard units', () => {
        const position = new Position({ x: 1, y: 2, z: 3, unit: LengthUnit.m });
        expect(position.x).toBe(1);
        expect(position.y).toBe(2);
        expect(position.z).toBe(3);
        expect(position.unit).toBe(LengthUnit.m);
    });

    it('should convert between different position units', () => {
        const positionInMeters = new Position({
            x: 1,
            y: 2,
            z: 3,
            unit: LengthUnit.m,
        });

        const positionInFeet = positionInMeters.convert(LengthUnit.ft);
        expect(positionInFeet.x).toBeCloseTo(3.28084, 3);
        expect(positionInFeet.y).toBeCloseTo(6.56168, 3);
        expect(positionInFeet.z).toBeCloseTo(9.84252, 3);
        expect(positionInFeet.unit).toBe(LengthUnit.ft);

        const positionInInches = positionInMeters.convert(LengthUnit.in);
        expect(positionInInches.x).toBeCloseTo(39.3701, 3);
        expect(positionInInches.y).toBeCloseTo(78.7402, 3);
        expect(positionInInches.z).toBeCloseTo(118.1102, 3);
        expect(positionInInches.unit).toBe(LengthUnit.in);

        const positionInMiles = positionInMeters.convert(LengthUnit.mile);
        expect(positionInMiles.x).toBeCloseTo(0.000621371, 6);
        expect(positionInMiles.y).toBeCloseTo(0.00124274, 6);
        expect(positionInMiles.z).toBeCloseTo(0.00186411, 6);
        expect(positionInMiles.unit).toBe(LengthUnit.mile);
    });
    it('should compute the magnitude of the vector correctly', () => {
        const position = new Position({
            x: 3,
            y: 4,
            z: 0,
            unit: LengthUnit.m,
        });
        const magnitude = position.magnitude;
        expect(magnitude.value).toBeCloseTo(5, 5);
        expect(magnitude.unit).toBe(LengthUnit.m);
    });
});
