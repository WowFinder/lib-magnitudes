import {
    makeScalarConversions,
    makeVectorConversions,
    type ScalarConversion,
} from '../Conversion';
import { describe, it, expect } from 'vitest';
import {
    timeUnitConversionFactors,
    Time,
    TimeUnit,
    lengthConversionFactors,
    Position,
    LengthUnit,
} from '../../Magnitude/Base';

function getScalarConverters(): ScalarConversion<typeof TimeUnit, Time> {
    return makeScalarConversions<typeof TimeUnit, Time>(
        timeUnitConversionFactors,
        ({ value, unit }) => new Time({ value, unit }),
    );
}

describe('Conversion', () => {
    describe('makeScalarConversions', () => {
        it('should create a conversion function', () => {
            const convert = getScalarConverters();
            const sampleTime = new Time({ value: 30, unit: TimeUnit.s });
            const convertedToMinutes = convert(sampleTime, TimeUnit.m);
            expect(convertedToMinutes).toBeDefined();
            expect(convertedToMinutes.value).toBeCloseTo(0.5, 4);
            expect(convertedToMinutes.unit).toBe(TimeUnit.m);
        });
    });
    describe('makeVectorConversions', () => {
        it('should create a conversion function', () => {
            const convert = makeVectorConversions<typeof LengthUnit, Position>(
                lengthConversionFactors,
                ({ x, y, z, unit }) => new Position({ x, y, z, unit }),
            );
            const samplePosition = new Position({
                x: 1,
                y: 2,
                z: 3,
                unit: LengthUnit.m,
            });
            const convertedToYards = convert(samplePosition, LengthUnit.yd);
            expect(convertedToYards).toBeDefined();
            expect(convertedToYards.x).toBeCloseTo(1.09361);
            expect(convertedToYards.y).toBeCloseTo(2.18722);
            expect(convertedToYards.z).toBeCloseTo(3.28084);
            expect(convertedToYards.unit).toBe(LengthUnit.yd);
        });
    });
});
