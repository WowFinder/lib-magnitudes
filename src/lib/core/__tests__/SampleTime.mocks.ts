import { unitParser } from '../helpers';
import { Scalar } from '../Scalar';

const SampleTimeUnits = {
    s: 's',
    m: 'm',
    h: 'h',
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
    h: 3600,
};

class SampleTimeImpl extends Scalar<typeof SampleTimeUnits> {
    constructor(builder: SampleTimeBuilder) {
        super(builder);
    }

    convert(to: keyof typeof SampleTimeUnits): SampleTimeImpl {
        const factor =
            sampleTimeConversionFactors[this.unit] /
            sampleTimeConversionFactors[to];
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
    SampleTimeImpl,
};
