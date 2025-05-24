import { Scalar } from '../Scalar';
import { type PrefixSpec } from '../../Units/Prefix';
import { unitParser } from '../helpers';
import { describe, it, expect } from 'vitest';

const SampleTimeUnits = {
    s: 's',
    m: 'm',
} as const;

const sampleTimeUnitParser = unitParser(SampleTimeUnits);

type SampleTimeBuilder = {
    value: number;
    unit: keyof typeof SampleTimeUnits;
};

const conversionFactors: { [key in keyof typeof SampleTimeUnits]: number } = {
    s: 1,
    m: 60,
};

const miliPrefix: PrefixSpec = {
    symbol: 'm',
    exp: -3,
    siName: 'mili',
    auxiliar: false,
};

class SampleTimeImpl extends Scalar<typeof SampleTimeUnits> {
    constructor(builder: SampleTimeBuilder) {
        super(builder);
    }

    convert(to: keyof typeof SampleTimeUnits): SampleTimeImpl {
        const factor = conversionFactors[to] / conversionFactors[this.unit];
        return new SampleTimeImpl({
            value: this.value * factor,
            unit: to,
        });
    }
}

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
    });
    it('should stringify correctly', () => {
        const scalar = new SampleTimeImpl({ value: 0.1, unit: 's' });
        expect(scalar.toRawString()).toBe('0.1 s');
        expect(scalar.toPrefixedString(1)).toBe('100.0 ms');
        expect(scalar.toPrefixedString(0, miliPrefix)).toBe('100 ms');
        expect(scalar.toString()).toBe('100.000 ms');
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
