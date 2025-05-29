import { fillDimensionality } from '../../../core';
import { Volume, VolumeUnit, assertIsVolumeUnitKey } from '../Volume';
import { describe, expect, it } from 'vitest';

describe('Volume', () => {
    it('should have the correct dimensions', () => {
        expect(Volume.dimensions).toEqual(fillDimensionality({ L: 3 }));
    });

    describe('assertIsVolumeUnitKey', () => {
        it('should return true for valid VolumeUnit keys', () => {
            expect(() => assertIsVolumeUnitKey('m³')).not.toThrow();
            expect(() => assertIsVolumeUnitKey('mile³')).not.toThrow();
            expect(() => assertIsVolumeUnitKey('ft³')).not.toThrow();
        });

        it('should throw an error for invalid VolumeUnit keys', () => {
            expect(() => assertIsVolumeUnitKey('invalid')).toThrow(
                'Invalid Volume Unit Key: invalid',
            );
        });
    });

    it('should construct a Volume instance with standard units', () => {
        const volume = new Volume({ value: 1, unit: 'm³' });
        expect(volume.value).toBe(1);
        expect(volume.unit).toBe(VolumeUnit['m³']);
    });

    it('should convert between different volume units', () => {
        const volumeInCubicMeters = new Volume({ value: 1, unit: 'm³' });
        const volumeInCubicYards = volumeInCubicMeters.convert('yd³');
        expect(volumeInCubicYards.value).toBeCloseTo(1.3079506, 7);
        expect(volumeInCubicYards.unit).toBe('yd³');
    });
});
