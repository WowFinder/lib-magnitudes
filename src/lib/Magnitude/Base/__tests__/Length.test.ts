import { fillDimensionality } from '../../../Units';
import { LengthUnit, Length } from '../Length';
import { describe, expect, it } from 'vitest';

describe('Length', () => {
    it('should have the correct dimensions', () => {
        expect(Length.dimensions).toEqual(fillDimensionality({ L: 1 }));
    });
    it('should construct a Length instance with standard units', () => {
        const length = new Length({ value: 1, unit: LengthUnit.m });
        expect(length.value).toBe(1);
        expect(length.unit).toBe('m');
    });

    it('should construct a Length instance with other units', () => {
        const length = new Length({ value: 1, unit: LengthUnit.ft });
        expect(length.value).toBe(1);
        expect(length.unit).toBe('ft');
    });

    it('should convert between different length units', () => {
        const lengthInMeters = new Length({ value: 1, unit: LengthUnit.m });

        const lengthInFeet = lengthInMeters.convert(LengthUnit.ft);
        expect(lengthInFeet.value).toBeCloseTo(3.28084, 3);
        expect(lengthInFeet.unit).toBe('ft');

        const lengthInInches = lengthInMeters.convert(LengthUnit.in);
        expect(lengthInInches.value).toBeCloseTo(39.3701, 3);
        expect(lengthInInches.unit).toBe('in');

        const lengthInYards = lengthInMeters.convert(LengthUnit.yd);
        expect(lengthInYards.value).toBeCloseTo(1.09361, 3);
        expect(lengthInYards.unit).toBe('yd');

        const lengthInMiles = lengthInMeters.convert(LengthUnit.mile);
        expect(lengthInMiles.value).toBeCloseTo(0.000621371, 3);
        expect(lengthInMiles.unit).toBe('mile');
    });

    it('should convert large astronomical units', () => {
        const andromedaDistance = new Length({
            value: 2537000,
            unit: LengthUnit.ly,
        });

        const distanceInAu = andromedaDistance.convert(LengthUnit.au);
        expect(distanceInAu.value).toBeCloseTo(160442095784.45557, 3);
        expect(distanceInAu.unit).toBe('au');

        const distanceInPc = andromedaDistance.convert(LengthUnit.pc);
        expect(distanceInPc.value).toBeCloseTo(777839.579, 3);
        expect(distanceInPc.unit).toBe('pc');

        const distanceInMeters = andromedaDistance.convert(LengthUnit.m);
        expect(distanceInMeters.value).toBeCloseTo(2.40017959e22, 0);
        expect(distanceInMeters.unit).toBe('m');
        expect(distanceInMeters.toString()).toBe('24.002 Zm');
    });
    it('should convert microscopic units', () => {
        const plankLength = new Length({ value: 1, unit: LengthUnit.lp });
        const plankLengthInMeters = plankLength.convert(LengthUnit.m);
        expect(plankLengthInMeters.value).toBeCloseTo(1.616255e-35, 32);
        expect(plankLengthInMeters.unit).toBe('m');
        const plankLengthInAngstroms = plankLength.convert(LengthUnit.Å);
        expect(plankLengthInAngstroms.value).toBeCloseTo(1.616255e-25, 22);
        expect(plankLengthInAngstroms.unit).toBe('Å');

        const angstromLength = new Length({ value: 1, unit: LengthUnit.Å });
        const angstromLengthInMeters = angstromLength.convert(LengthUnit.m);
        expect(angstromLengthInMeters.value).toBeCloseTo(1e-10, 7);
        expect(angstromLengthInMeters.unit).toBe('m');
        expect(angstromLengthInMeters.toString()).toBe('100.000 pm');
    });
});
