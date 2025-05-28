import { fillDimensionality } from '../../../core';
import { Area, AreaUnit, Surface, assertIsAreaUnitKey } from '../Surface';
import { describe, expect, it } from 'vitest';

describe('Area and Surface classes', () => {
    describe('Area', () => {
        it('should have the correct dimensions', () => {
            expect(Area.dimensions).toEqual(fillDimensionality({ L: 2 }));
        });

        describe('assertIsAreaUnitKey', () => {
            it('should return true for valid AreaUnit keys', () => {
                expect(() => assertIsAreaUnitKey('m²')).not.toThrow();
                expect(() => assertIsAreaUnitKey('mile²')).not.toThrow();
                expect(() => assertIsAreaUnitKey('ft²')).not.toThrow();
            });

            it('should throw an error for invalid AreaUnit keys', () => {
                expect(() => assertIsAreaUnitKey('invalid')).toThrow(
                    'Invalid Area Unit Key: invalid',
                );
            });
        });

        it('should construct an Area instance with standard units', () => {
            const area = new Area({ value: 1, unit: 'm²' });
            expect(area.value).toBe(1);
            expect(area.unit).toBe(AreaUnit['m²']);
        });

        it('should convert between different area units', () => {
            const areaInSquareMeters = new Area({ value: 1, unit: 'm²' });
            const areaInSquareMiles = areaInSquareMeters.convert('mile²');
            expect(areaInSquareMiles.value).toBeCloseTo(0.000000386102, 6);
            expect(areaInSquareMiles.unit).toBe('mile²');
        });
    });

    describe('Surface', () => {
        it('should have the correct dimensions', () => {
            expect(Surface.dimensions).toEqual(fillDimensionality({ L: 2 }));
        });

        it('should construct a Surface instance with standard units', () => {
            const surface = new Surface({ x: 1, y: 2, z: 3, unit: 'm²' });
            expect(surface.x).toBe(1);
            expect(surface.y).toBe(2);
            expect(surface.z).toBe(3);
            expect(surface.unit).toBe(AreaUnit['m²']);
        });

        it('should convert between different surface units', () => {
            const surfaceInSquareMeters = new Surface({
                x: 1,
                y: 2,
                z: 3,
                unit: 'm²',
            });
            const surfaceInSquareMiles = surfaceInSquareMeters.convert('mile²');
            expect(surfaceInSquareMiles.x).toBeCloseTo(0.000000386102, 6);
            expect(surfaceInSquareMiles.y).toBeCloseTo(0.000000772204, 6);
            expect(surfaceInSquareMiles.z).toBeCloseTo(0.00000115831, 6);
            expect(surfaceInSquareMiles.unit).toBe('mile²');
        });
    });
});
