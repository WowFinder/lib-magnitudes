import { describe, it, expect } from 'vitest';

import { Time, TimeUnit } from '../../Magnitude/Base';
import { milliPrefix } from './common.mocks';
import { type ScalarBuilder } from '../Scalar';
import { unitParser } from '../helpers';

const sampleCtor = ({ value, unit }: ScalarBuilder<typeof TimeUnit>): Time =>
    new Time({ value, unit });

const timeUnitParser = unitParser(TimeUnit);

describe('Scalar', () => {
    it('should create a scalar from a builder', () => {
        const scalar = sampleCtor({ value: 1, unit: TimeUnit.s });
        expect(scalar).toBeDefined();
    });

    it('should convert between units', () => {
        const scalar = sampleCtor({ value: 1, unit: TimeUnit.s });
        const converted = scalar.convert(TimeUnit.m);
        expect(converted).toBeDefined();
        expect(converted.unit).toBe(TimeUnit.m);
        expect(converted.value).toBeCloseTo(1.0 / 60);
        const minuteScalar = sampleCtor({ value: 1, unit: TimeUnit.m });
        const minuteAsSeconds = minuteScalar.convert(TimeUnit.s);
        expect(minuteAsSeconds).toBeDefined();
        expect(minuteAsSeconds.unit).toBe(TimeUnit.s);
        expect(minuteAsSeconds.value).toBeCloseTo(60);
    });
    it('should stringify correctly', () => {
        const scalar = sampleCtor({ value: 0.1, unit: TimeUnit.s });
        expect(scalar.toRawString()).toBe('0.1 s');
        expect(scalar.toPrefixedString(1)).toBe('1e+2 ms');
        expect(scalar.toPrefixedString(2, milliPrefix)).toBe('1.0e+2 ms');
        expect(scalar.toString()).toBe('100 ms');
    });
    describe('parsing', () => {
        it('should parse a valid string', () => {
            const parsed = Time.parse('1.5 m', timeUnitParser);
            expect(parsed).toBeDefined();
            expect(parsed?.value).toBe(1.5);
            expect(parsed?.unit).toBe(TimeUnit.m);
        });
        it('should parse a valid prefixed string', () => {
            const parsed = Time.parse('1500 ms', timeUnitParser);
            expect(parsed).toBeDefined();
            expect(parsed?.value).toBe(1.5);
            expect(parsed?.unit).toBe(TimeUnit.s);
        });
        it('should fail to parse an invalid string', () => {
            const parsed = Time.tryParse('invalid input', timeUnitParser);
            expect(parsed).toBeUndefined();
        });
        it('should fail to parse an invalid string with an apparently valid prefix', () => {
            const parsed = Time.tryParse('1.5 kx', timeUnitParser);
            expect(parsed).toBeUndefined();
        });
    });
    describe('add', () => {
        it('should add multiple scalars in the same unit', () => {
            const sum = Time.add(
                sampleCtor,
                TimeUnit.s,
                sampleCtor({ value: 35, unit: TimeUnit.s }),
                sampleCtor({ value: 60, unit: TimeUnit.s }),
                sampleCtor({ value: 85, unit: TimeUnit.s }),
            );
            expect(sum).toBeDefined();
            expect(sum.value).toBe(180);
            expect(sum.unit).toBe(TimeUnit.s);
        });
        it('should add multiple scalars in different units', () => {
            const sum = Time.add(
                sampleCtor,
                TimeUnit.h,
                sampleCtor({ value: 3600, unit: TimeUnit.s }),
                sampleCtor({ value: 60, unit: TimeUnit.m }),
                sampleCtor({ value: 1, unit: TimeUnit.h }),
            );
            expect(sum).toBeDefined();
            expect(sum.value).toBe(3);
            expect(sum.unit).toBe(TimeUnit.h);
        });
    });
});
