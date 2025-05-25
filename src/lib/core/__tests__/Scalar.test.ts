import { describe, it, expect } from 'vitest';
import {
    SampleTimeImpl,
    SampleTimeUnits,
    sampleTimeUnitParser,
} from './SampleTime.mocks';
import { milliPrefix } from './common.mocks';

describe('Scalar', () => {
    it('should create a scalar from a builder', () => {
        const scalar = new SampleTimeImpl({ value: 1, unit: 's' });
        expect(scalar).toBeDefined();
    });

    it('should convert between units', () => {
        const scalar = new SampleTimeImpl({ value: 1, unit: 's' });
        const converted = scalar.convert('m');
        expect(converted).toBeDefined();
        expect(converted.unit).toBe(SampleTimeUnits.m);
        expect(converted.value).toBeCloseTo(1.0 / 60);
        const minuteScalar = new SampleTimeImpl({ value: 1, unit: 'm' });
        const minuteAsSeconds = minuteScalar.convert('s');
        expect(minuteAsSeconds).toBeDefined();
        expect(minuteAsSeconds.unit).toBe(SampleTimeUnits.s);
        expect(minuteAsSeconds.value).toBeCloseTo(60);
    });
    it('should stringify correctly', () => {
        const scalar = new SampleTimeImpl({ value: 0.1, unit: 's' });
        expect(scalar.toRawString()).toBe('0.1 s');
        expect(scalar.toPrefixedString(1)).toBe('1e+2 ms');
        expect(scalar.toPrefixedString(2, milliPrefix)).toBe('1.0e+2 ms');
        expect(scalar.toString()).toBe('100 ms');
    });
    describe('parsing', () => {
        it('should parse a valid string', () => {
            const parsed = SampleTimeImpl.parse('1.5 m', sampleTimeUnitParser);
            expect(parsed).toBeDefined();
            expect(parsed?.value).toBe(1.5);
            expect(parsed?.unit).toBe('m');
        });
        it('should parse a valid prefixed string', () => {
            const parsed = SampleTimeImpl.parse(
                '1500 ms',
                sampleTimeUnitParser,
            );
            expect(parsed).toBeDefined();
            expect(parsed?.value).toBe(1.5);
            expect(parsed?.unit).toBe('s');
        });
        it('should fail to parse an invalid string', () => {
            const parsed = SampleTimeImpl.tryParse(
                'invalid input',
                sampleTimeUnitParser,
            );
            expect(parsed).toBeUndefined();
        });
        it('should fail to parse an invalid string with an apparently valid prefix', () => {
            const parsed = SampleTimeImpl.tryParse(
                '1.5 kd',
                sampleTimeUnitParser,
            );
            expect(parsed).toBeUndefined();
        });
    });
});
