import { Scalar } from '../Scalar';
import { Vector3D } from '../Vector3D';
import { makeScalarConversions, type ConversionFactors } from '../Conversion';
import { type KeyAsValueObject } from '../helpers';

const SampleLengthUnits = {
    m: 'm',
    yd: 'yd',
    in: 'in',
} as const;

const sampleLengthConversionFactors: ConversionFactors<
    typeof SampleLengthUnits
> = {
    m: 1,
    yd: 0.9144,
    in: 0.0254,
};

type SampleLengthBuilder = {
    readonly value: number;
    readonly unit: keyof typeof SampleLengthUnits;
};

class SampleLengthImpl extends Scalar<typeof SampleLengthUnits> {
    constructor(builder: SampleLengthBuilder) {
        super(builder);
    }

    convert(to: keyof typeof SampleLengthUnits): SampleLengthImpl {
        const factor =
            sampleLengthConversionFactors[this.unit] /
            sampleLengthConversionFactors[to];

        return new SampleLengthImpl({
            value: this.value * factor,
            unit: to,
        });
    }
}

type SamplePositionBuilder = {
    readonly x?: number;
    readonly y?: number;
    readonly z?: number;
    readonly unit?: keyof typeof SampleLengthUnits;
};

class SamplePositionImpl extends Vector3D<typeof SampleLengthUnits> {
    constructor({
        x = 0,
        y = 0,
        z = 0,
        unit = SampleLengthUnits.m,
    }: SamplePositionBuilder) {
        super({ x, y, z, unit });
    }

    convert(to: keyof typeof SampleLengthUnits): SamplePositionImpl {
        const factor =
            sampleLengthConversionFactors[this.unit] /
            sampleLengthConversionFactors[to];
        return new SamplePositionImpl({
            x: this.x * factor,
            y: this.y * factor,
            z: this.z * factor,
            unit: to,
        });
    }

    get magnitude(): SampleLengthImpl {
        return new SampleLengthImpl(this.magnitudeBuilder);
    }
}

type SampleAreaUnitKeys = `${keyof typeof SampleLengthUnits}²`;
// eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
const SampleAreaUnits: KeyAsValueObject<SampleAreaUnitKeys> = {
    'm²': 'm²',
    'yd²': 'yd²',
    'in²': 'in²',
} as const;
const sampleAreaUnitConversionFactors = {
    'm²': 1,
    'yd²': sampleLengthConversionFactors.yd ** 2,
    'in²': sampleLengthConversionFactors.in ** 2,
} as const;

type SampleAreaBuilder = {
    readonly value: number;
    readonly unit: keyof typeof SampleAreaUnits;
};
class SampleAreaImpl extends Scalar<typeof SampleAreaUnits> {
    static readonly #converter = makeScalarConversions(
        sampleAreaUnitConversionFactors,
        ({ value, unit }) => new SampleAreaImpl({ value, unit }),
    );
    constructor(builder: SampleAreaBuilder) {
        super(builder);
    }

    convert(to: keyof typeof SampleAreaUnits): SampleAreaImpl {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return SampleAreaImpl.#converter(this, to);
    }
}

type SampleSurfaceBuilder = {
    readonly x?: number;
    readonly y?: number;
    readonly z?: number;
    readonly unit?: keyof typeof SampleAreaUnits;
};
class SampleSurfaceImpl extends Vector3D<typeof SampleAreaUnits> {
    constructor({
        x = 0,
        y = 0,
        z = 0,
        unit = SampleAreaUnits['m²'],
    }: SampleSurfaceBuilder) {
        super({ x, y, z, unit });
    }

    convert(to: keyof typeof SampleAreaUnits): SampleSurfaceImpl {
        const factor =
            sampleAreaUnitConversionFactors[this.unit] /
            sampleAreaUnitConversionFactors[to];
        return new SampleSurfaceImpl({
            x: this.x * factor,
            y: this.y * factor,
            z: this.z * factor,
            unit: to,
        });
    }

    get magnitude(): SampleAreaImpl {
        return new SampleAreaImpl(this.magnitudeBuilder);
    }
}

export {
    SampleLengthUnits,
    sampleLengthConversionFactors,
    SampleAreaUnits,
    sampleAreaUnitConversionFactors,
    type SamplePositionBuilder,
    SamplePositionImpl,
    type SampleLengthBuilder,
    SampleLengthImpl,
    type SampleAreaBuilder,
    SampleAreaImpl,
    type SampleSurfaceBuilder,
    SampleSurfaceImpl,
};
