import { describe, it, expect } from 'vitest';

// TODO: Use some actual magnitudes and remove unnecessary mocks

import {
    SamplePositionImpl,
    SampleLengthUnits,
    SampleLengthImpl,
    SampleAreaUnits,
    SampleSurfaceImpl,
    type SampleSurfaceBuilder,
    type SampleAreaBuilder,
    SampleAreaImpl,
} from './SamplePosition.mocks';
import { milliPrefix } from './common.mocks';
import { Vector3D, type Vector3DBuilder } from '../Vector3D';

const sampleCtor = ({
    x,
    y,
    z,
    unit,
}: Vector3DBuilder<typeof SampleLengthUnits>): SamplePositionImpl => {
    return new SamplePositionImpl({ x, y, z, unit });
};

describe('Vector3D', () => {
    it('should create a vector from a builder', () => {
        const vector = sampleCtor({ x: 1, y: 2, z: 3, unit: 'm' });
        expect(vector).toBeDefined();
        expect(vector.x).toBe(1);
        expect(vector.y).toBe(2);
        expect(vector.z).toBe(3);
        expect(vector.unit).toBe(SampleLengthUnits.m);
    });
    it('should convert between units', () => {
        const vector = sampleCtor({ x: 1, y: 2, z: 3, unit: 'm' });
        const converted = vector.convert('yd');
        expect(converted).toBeDefined();
        expect(converted.x).toBeCloseTo(1.09361);
        expect(converted.y).toBeCloseTo(2.18722);
        expect(converted.z).toBeCloseTo(3.28084);
        expect(converted.unit).toBe(SampleLengthUnits.yd);
    });

    it('should stringify correctly', () => {
        const vector = sampleCtor({ x: 0.1, y: 0.02, z: 0.003, unit: 'm' });
        expect(vector.toRawString()).toBe('(0.1, 0.02, 0.003) m');
        expect(vector.toPrefixedString(2, milliPrefix)).toBe(
            '(1.0e+2 mm, 20 mm, 3.0 mm)',
        );
        expect(vector.toString()).toBe('(100 mm, 20.0 mm, 3.00 mm)');
    });

    it('should calculate magnitude correctly', () => {
        const vector = sampleCtor({ x: 3, y: 4, z: 0, unit: 'm' });
        const magnitude = vector.magnitude;
        expect(magnitude).toBeDefined();
        expect(magnitude.value).toBeCloseTo(5);
        expect(magnitude.unit).toBe(SampleLengthUnits.m);
    });

    describe('add', () => {
        it('should add vectors correctly', () => {
            const vector1 = sampleCtor({ x: 1, y: 2, z: 3, unit: 'm' });
            const vector2 = sampleCtor({ x: 4, y: 5, z: 6, unit: 'yd' });
            const vector3 = sampleCtor({ x: 12, y: 24, z: 36, unit: 'in' });
            const sum = SamplePositionImpl.add(
                sampleCtor,
                SampleLengthUnits.m,
                vector1,
                vector2,
                vector3,
            );
            expect(sum).toBeDefined();
            expect(sum.x).toBeCloseTo(4.9624, 5); // 1 m + 4 yd + 12 in = 4.9624 m
            expect(sum.y).toBeCloseTo(7.1816, 5); // 2 m + 5 yd + 24 in = 7.1816 m
            expect(sum.z).toBeCloseTo(9.4008, 5); // 3 m + 6 yd + 36 in = 9.4008 m
            expect(sum.unit).toBe(SampleLengthUnits.m);
        });
    });

    describe('scalarProduct', () => {
        it('should calculate scalar product correctly', () => {
            const vector1 = sampleCtor({ x: 1, y: 2, z: 3, unit: 'm' });
            const scalar = new SampleLengthImpl({ value: 4, unit: 'm' });
            const scalarProduct = Vector3D.scalarProduct<
                typeof SampleLengthUnits,
                SamplePositionImpl,
                typeof SampleLengthUnits,
                SampleLengthImpl,
                typeof SampleAreaUnits,
                SampleSurfaceImpl
            >(
                (args: SampleSurfaceBuilder) => new SampleSurfaceImpl(args),
                SampleAreaUnits['m²'],
                vector1,
                scalar,
            );
            expect(scalarProduct).toBeDefined();
            expect(scalarProduct.x).toBeCloseTo(4); // 1 m * 4 m = 4 m²
            expect(scalarProduct.y).toBeCloseTo(8); // 2 m * 4 m = 8 m²
            expect(scalarProduct.z).toBeCloseTo(12); // 3 m * 4 m = 12 m²
            expect(scalarProduct.unit).toBe(SampleAreaUnits['m²']);
        });
    });
    describe('dotProduct', () => {
        it('should calculate dot product correctly', () => {
            const vector1 = sampleCtor({ x: 1, y: 2, z: 3, unit: 'm' });
            const vector2 = sampleCtor({ x: 4, y: 5, z: 6, unit: 'm' });
            const dotProduct = Vector3D.dotProduct<
                typeof SampleLengthUnits,
                typeof SampleLengthUnits,
                typeof SampleAreaUnits,
                SamplePositionImpl,
                SamplePositionImpl,
                SampleAreaImpl
            >(
                ({ value, unit }: SampleAreaBuilder) =>
                    new SampleAreaImpl({ value, unit }),
                SampleAreaUnits['m²'],
                vector1,
                vector2,
            );
            expect(dotProduct).toBeDefined();
            expect(dotProduct.value).toBeCloseTo(32); // 1*4 + 2*5 + 3*6 = 32
            expect(dotProduct.unit).toBe(SampleAreaUnits['m²']);
        });
    });
    describe('crossProduct', () => {
        it('should calculate cross product correctly', () => {
            const vector1 = sampleCtor({ x: 1, y: 2, z: 3, unit: 'm' });
            const vector2 = sampleCtor({ x: 4, y: 5, z: 6, unit: 'm' });
            const crossProduct = Vector3D.crossProduct<
                typeof SampleLengthUnits,
                typeof SampleLengthUnits,
                typeof SampleAreaUnits,
                SamplePositionImpl,
                SamplePositionImpl,
                SampleSurfaceImpl
            >(
                (args: SampleSurfaceBuilder) => new SampleSurfaceImpl(args),
                SampleAreaUnits['m²'],
                vector1,
                vector2,
            );
            expect(crossProduct).toBeDefined();
            expect(crossProduct.x).toBeCloseTo(-3); // 2*6 - 3*5
            expect(crossProduct.y).toBeCloseTo(6); // 3*4 - 1*6
            expect(crossProduct.z).toBeCloseTo(-3); // 1*5 - 2*4
            expect(crossProduct.unit).toBe(SampleAreaUnits['m²']);
        });
    });
});
