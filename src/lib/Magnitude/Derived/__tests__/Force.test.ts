import { fillDimensionality } from '../../../core';
import { Force, ScalarForce, ForceUnit } from '../Force';
import { describe, expect, it } from 'vitest';

describe('Scalar and vectorial Force classes', () => {
    describe('ScalarForce', () => {
        it('should have the correct dimensions', () => {
            expect(ScalarForce.dimensions).toEqual(
                fillDimensionality({ M: 1, L: 1, T: -2 }),
            );
        });

        it('should construct a ScalarForce instance with standard units', () => {
            const force = new ScalarForce({ value: 1, unit: ForceUnit.N });
            expect(force.value).toBe(1);
            expect(force.unit).toBe(ForceUnit.N);
        });

        it('should convert between different force units', () => {
            const forceInNewtons = new ScalarForce({
                value: 1,
                unit: ForceUnit.N,
            });

            const forceInPoundsForce = forceInNewtons.convert(ForceUnit.lbf);
            expect(forceInPoundsForce.value).toBeCloseTo(0.224809, 6);
            expect(forceInPoundsForce.unit).toBe(ForceUnit.lbf);

            const forceInNewtonsAgain = forceInPoundsForce.convert(ForceUnit.N);
            expect(forceInNewtonsAgain.value).toBeCloseTo(1, 6);
            expect(forceInNewtonsAgain.unit).toBe(ForceUnit.N);
        });
    });

    describe('Force', () => {
        it('should have the correct dimensions', () => {
            expect(Force.dimensions).toEqual(
                fillDimensionality({ M: 1, L: 1, T: -2 }),
            );
        });

        it('should construct a Force instance with default values', () => {
            const force = new Force({});
            expect(force.x).toBe(0);
            expect(force.y).toBe(0);
            expect(force.z).toBe(0);
            expect(force.unit).toBe(ForceUnit.N);
        });
        it('should construct a Force instance with standard units', () => {
            const force = new Force({ x: 1, y: 2, z: 3, unit: ForceUnit.N });
            expect(force.x).toBe(1);
            expect(force.y).toBe(2);
            expect(force.z).toBe(3);
            expect(force.unit).toBe(ForceUnit.N);
        });
        it('should convert between different force units', () => {
            const forceInNewtons = new Force({
                x: 1,
                y: 2,
                z: 3,
                unit: ForceUnit.N,
            });

            const forceInPoundsForce = forceInNewtons.convert(ForceUnit.lbf);
            expect(forceInPoundsForce.x).toBeCloseTo(0.224809, 6);
            expect(forceInPoundsForce.y).toBeCloseTo(0.449618, 6);
            expect(forceInPoundsForce.z).toBeCloseTo(0.674427, 6);
            expect(forceInPoundsForce.unit).toBe(ForceUnit.lbf);

            const forceInNewtonsAgain = forceInPoundsForce.convert(ForceUnit.N);
            expect(forceInNewtonsAgain.x).toBeCloseTo(1, 6);
            expect(forceInNewtonsAgain.y).toBeCloseTo(2, 6);
            expect(forceInNewtonsAgain.z).toBeCloseTo(3, 6);
            expect(forceInNewtonsAgain.unit).toBe(ForceUnit.N);
        });

        it('should calculate the magnitude correctly', () => {
            const force = new Force({ x: 3, y: 4, z: 0, unit: ForceUnit.N });
            const magnitude = force.magnitude;
            expect(magnitude.value).toBe(5);
            expect(magnitude.unit).toBe(ForceUnit.N);
        });
    });
});
