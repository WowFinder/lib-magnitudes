import { type PrefixSpec } from '../../core';
import { unitParser } from '../helpers';
import { Scalar } from '../Scalar';

const SampleTimeUnits = {
    s: 's',
    m: 'm',
} as const;

const sampleTimeUnitParser = unitParser(SampleTimeUnits);

type SampleTimeBuilder = {
    value: number;
    unit: keyof typeof SampleTimeUnits;
};

const sampleTimeConversionFactors: {
    [key in keyof typeof SampleTimeUnits]: number;
} = {
    s: 1,
    m: 60,
};

const milliPrefix: PrefixSpec = {
    symbol: 'm',
    exp: -3,
    siName: 'milli',
    auxiliar: false,
};

class SampleTimeImpl extends Scalar<typeof SampleTimeUnits> {
    constructor(builder: SampleTimeBuilder) {
        super(builder);
    }

    convert(to: keyof typeof SampleTimeUnits): SampleTimeImpl {
        const factor =
            sampleTimeConversionFactors[to] /
            sampleTimeConversionFactors[this.unit];
        return new SampleTimeImpl({
            value: this.value * factor,
            unit: to,
        });
    }
}

export {
    SampleTimeUnits,
    sampleTimeUnitParser,
    type SampleTimeBuilder,
    sampleTimeConversionFactors,
    milliPrefix,
    SampleTimeImpl,
};
