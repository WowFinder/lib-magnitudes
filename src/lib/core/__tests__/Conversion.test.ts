import { makeConversions, add, type Conversion } from '../Conversion';
import { describe, it, expect } from 'vitest';
import {
    sampleTimeConversionFactors,
    SampleTimeImpl,
    type SampleTimeUnits,
} from './SampleTime.mocks';

function getConverters(): Conversion<typeof SampleTimeUnits, SampleTimeImpl> {
    return makeConversions<typeof SampleTimeUnits, SampleTimeImpl>(
        sampleTimeConversionFactors,
        ({ value, unit }) => new SampleTimeImpl({ value, unit }),
    );
}

describe('Conversion', () => {
    describe('makeConversions', () => {
        it('should create a conversion function', () => {
            const convert = getConverters();
            const sampleTime = new SampleTimeImpl({ value: 30, unit: 's' });
            const convertedToMinutes = convert(sampleTime, 'm');
            expect(convertedToMinutes).toBeDefined();
            expect(convertedToMinutes.value).toBeCloseTo(0.5, 4);
            expect(convertedToMinutes.unit).toBe('m');
        });
    });
    describe('add', () => {
        it('should add multiple magnitudes in the same unit', () => {
            const convert = getConverters();
            const sum = add(
                convert,
                's',
                new SampleTimeImpl({ value: 30, unit: 's' }),
                new SampleTimeImpl({ value: 90, unit: 's' }),
            );
            expect(sum).toBeDefined();
            expect(sum.value).toBe(120);
            expect(sum.unit).toBe('s');
        });

        it('should add magnitudes in different units', () => {
            const convert = getConverters();
            const sum = add(
                convert,
                'm',
                new SampleTimeImpl({ value: 1, unit: 'm' }),
                new SampleTimeImpl({ value: 60, unit: 's' }),
            );
            expect(sum).toBeDefined();
            expect(sum.value).toBeCloseTo(2, 4);
            expect(sum.unit).toBe('m');
        });
    });
});
