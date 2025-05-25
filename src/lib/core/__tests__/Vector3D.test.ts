import { describe, it, expect } from 'vitest';

import {
    SampleLengthImpl,
    SamplePositionImpl,
    SamplePositionUnits,
} from './SamplePosition.mocks';
import { milliPrefix } from './common.mocks';

describe('Vector3D', () => {
    it('should create a vector from a builder', () => {
        const vector = new SamplePositionImpl({ x: 1, y: 2, z: 3 });
        expect(vector).toBeDefined();
        expect(vector.x).toBe(1);
        expect(vector.y).toBe(2);
        expect(vector.z).toBe(3);
        expect(vector.unit).toBe(SamplePositionUnits.m);
    });
    it('should convert between units', () => {
        const vector = new SamplePositionImpl({ x: 1, y: 2, z: 3 });
        const converted = vector.convert('yd');
        expect(converted).toBeDefined();
        expect(converted.x).toBeCloseTo(1.09361);
        expect(converted.y).toBeCloseTo(2.18722);
        expect(converted.z).toBeCloseTo(3.28084);
        expect(converted.unit).toBe(SamplePositionUnits.yd);
    });

    it('should stringify correctly', () => {
        const vector = new SamplePositionImpl({ x: 0.1, y: 0.02, z: 0.003 });
        expect(vector.toRawString()).toBe('(0.1, 0.02, 0.003) m');
        expect(vector.toPrefixedString(2, milliPrefix)).toBe(
            '(1.0e+2 mm, 20 mm, 3.0 mm)',
        );
        expect(vector.toString()).toBe('(100 mm, 20.0 mm, 3.00 mm)');
    });

    it('should calculate magnitude correctly', () => {
        const vector = new SamplePositionImpl({ x: 3, y: 4, z: 0 });
        const magnitude = vector.magnitude(
            builder => new SampleLengthImpl(builder),
        );
        expect(magnitude).toBeDefined();
        expect(magnitude.value).toBeCloseTo(5);
        expect(magnitude.unit).toBe(SamplePositionUnits.m);
    });
});
