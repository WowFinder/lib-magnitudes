import {
    makeScalarConversions,
    makeVectorConversions,
    type ScalarConversion,
} from '../Conversion';
import { describe, it, expect } from 'vitest';
import {
    sampleTimeConversionFactors,
    SampleTimeImpl,
    type SampleTimeUnits,
} from './SampleTime.mocks';
import {
    samplePositionConversionFactors,
    SamplePositionImpl,
    type SamplePositionUnits,
} from './SamplePosition.mocks';

function getScalarConverters(): ScalarConversion<
    typeof SampleTimeUnits,
    SampleTimeImpl
> {
    return makeScalarConversions<typeof SampleTimeUnits, SampleTimeImpl>(
        sampleTimeConversionFactors,
        ({ value, unit }) => new SampleTimeImpl({ value, unit }),
    );
}

describe('Conversion', () => {
    describe('makeScalarConversions', () => {
        it('should create a conversion function', () => {
            const convert = getScalarConverters();
            const sampleTime = new SampleTimeImpl({ value: 30, unit: 's' });
            const convertedToMinutes = convert(sampleTime, 'm');
            expect(convertedToMinutes).toBeDefined();
            expect(convertedToMinutes.value).toBeCloseTo(0.5, 4);
            expect(convertedToMinutes.unit).toBe('m');
        });
    });
    describe('makeVectorConversions', () => {
        it('should create a conversion function', () => {
            const convert = makeVectorConversions<
                typeof SamplePositionUnits,
                SamplePositionImpl
            >(
                samplePositionConversionFactors,
                ({ x, y, z, unit }) =>
                    new SamplePositionImpl({ x, y, z, unit }),
            );
            const samplePosition = new SamplePositionImpl({
                x: 1,
                y: 2,
                z: 3,
                unit: 'm',
            });
            const convertedToYards = convert(samplePosition, 'yd');
            expect(convertedToYards).toBeDefined();
            expect(convertedToYards.x).toBeCloseTo(1.09361);
            expect(convertedToYards.y).toBeCloseTo(2.18722);
            expect(convertedToYards.z).toBeCloseTo(3.28084);
            expect(convertedToYards.unit).toBe('yd');
        });
    });
});
