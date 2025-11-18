import { fillDimensionality } from '../../../core';
import { PlaneAngleUnit, PlaneAngle } from '../PlaneAngle';
import { describe, expect, it } from 'vitest';

describe('PlaneAngle', () => {
    it('should have the correct dimensions', () => {
        expect(PlaneAngle.dimensions).toEqual(fillDimensionality({ α: 1 }));
    });
    it('should construct a PlaneAngle instance with standard units', () => {
        const angle = new PlaneAngle({ value: 1, unit: PlaneAngleUnit.rad });
        expect(angle.value).toBe(1);
        expect(angle.unit).toBe('rad');
    });
    it('should construct a PlaneAngle instance with other units', () => {
        const angle = new PlaneAngle({ value: 180, unit: PlaneAngleUnit.deg });
        expect(angle.value).toBe(180);
        expect(angle.unit).toBe('deg');
    });
    it('should convert between different plane angle units', () => {
        const angleInDeg = new PlaneAngle({
            value: 180,
            unit: PlaneAngleUnit.deg,
        });
        const angleInRad = angleInDeg.convert(PlaneAngleUnit.rad);
        expect(angleInRad.value).toBeCloseTo(Math.PI, 5);
        expect(angleInRad.unit).toBe('rad');

        const angleInRev = angleInRad.convert(PlaneAngleUnit.rev);
        expect(angleInRev.value).toBeCloseTo(0.5, 5);
        expect(angleInRev.unit).toBe('rev');
    });
});
