import { Scalar } from '../Scalar';
import { Vector3D } from '../Vector3D';

const SamplePositionUnits = {
    m: 'm',
    yd: 'yd',
    in: 'in',
} as const;

const samplePositionConversionFactors: {
    [key in keyof typeof SamplePositionUnits]: number;
} = {
    m: 1,
    yd: 0.9144,
    in: 0.0254,
};

type SamplePositionBuilder = {
    readonly x?: number;
    readonly y?: number;
    readonly z?: number;
    readonly unit?: keyof typeof SamplePositionUnits;
};

class SamplePositionImpl extends Vector3D<typeof SamplePositionUnits> {
    constructor({
        x = 0,
        y = 0,
        z = 0,
        unit = SamplePositionUnits.m,
    }: SamplePositionBuilder) {
        super({ x, y, z, unit });
    }

    convert(to: keyof typeof SamplePositionUnits): SamplePositionImpl {
        const factor =
            samplePositionConversionFactors[this.unit] /
            samplePositionConversionFactors[to];
        return new SamplePositionImpl({
            x: this.x * factor,
            y: this.y * factor,
            z: this.z * factor,
            unit: to,
        });
    }
}

type SampleLengthBuilder = {
    readonly value: number;
    readonly unit: keyof typeof SamplePositionUnits;
};

class SampleLengthImpl extends Scalar<typeof SamplePositionUnits> {
    constructor(builder: SampleLengthBuilder) {
        super(builder);
    }

    convert(to: keyof typeof SamplePositionUnits): SampleLengthImpl {
        const factor =
            samplePositionConversionFactors[this.unit] /
            samplePositionConversionFactors[to];

        return new SampleLengthImpl({
            value: this.value * factor,
            unit: to,
        });
    }
}

export {
    SamplePositionUnits,
    samplePositionConversionFactors,
    type SamplePositionBuilder,
    SamplePositionImpl,
    type SampleLengthBuilder,
    SampleLengthImpl,
};
