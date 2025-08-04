import {
    type ConversionFactors,
    type Dimensionality,
    dimensionalityRatio,
    makeScalarConversions,
    Scalar,
    type ScalarBuilder,
    makeVectorConversions,
    Vector3D,
    type Vector3DBuilder,
} from '../../core';
import { assertIsValidKey, type KeyAsValueObject } from '../../core/StrictEnum';

import {
    lengthConversionFactors,
    LengthUnit,
    Time,
    TimeUnit,
    timeUnitConversionFactors,
} from '../Base';
import { Speed } from './Velocity';

type AccelerationUnitKey =
    | `${keyof typeof LengthUnit}/${keyof typeof TimeUnit}²`
    | `${keyof typeof LengthUnit}/${keyof typeof TimeUnit}/${keyof typeof TimeUnit}`;
const lengthUnitKeys = Object.keys(LengthUnit);
const timeUnitKeys = Object.keys(TimeUnit);
const lengthUnitMatcher = `(${lengthUnitKeys.join('|')})`;
const timeUnitMatcher = `(${timeUnitKeys.join('|')})`;
const accelerationSquareUnitMatcher = `${lengthUnitMatcher}/${timeUnitMatcher}²`;
const accelerationSplitUnitMatcher = `${lengthUnitMatcher}/${timeUnitMatcher}/${timeUnitMatcher}`;
const accelerationUnitKeyRegEx = new RegExp(
    `^(?:${accelerationSquareUnitMatcher}|${accelerationSplitUnitMatcher})$`,
);
function assertIsAccelerationUnitKey(
    key: string,
): asserts key is AccelerationUnitKey {
    if (!accelerationUnitKeyRegEx.test(key)) {
        throw new Error(`Invalid AccelerationUnit key: ${key}`);
    }
}

type AccelerationUnitEnum = KeyAsValueObject<AccelerationUnitKey>;

const conversionFactorsBuilder = {} as Record<
    AccelerationUnitEnum[keyof AccelerationUnitEnum],
    number
>;

function lengthFactor(key: string): number {
    return lengthConversionFactors[key as keyof typeof lengthConversionFactors];
}

function timeFactor(key: string): number {
    return timeUnitConversionFactors[
        key as keyof typeof timeUnitConversionFactors
    ];
}

const AccelerationUnit = Object.keys(LengthUnit).reduce(
    (acc, l) => {
        assertIsValidKey(l, LengthUnit);
        Object.keys(TimeUnit).forEach(t1 => {
            assertIsValidKey(t1, TimeUnit);
            Object.keys(TimeUnit).forEach(t2 => {
                assertIsValidKey(t2, TimeUnit);
                const key = `${l}/${t1}/${t2}` as AccelerationUnitKey;
                assertIsAccelerationUnitKey(key);
                acc[key] = key;
                const factor =
                    lengthFactor(l) / timeFactor(t1) / timeFactor(t2);
                conversionFactorsBuilder[key] = factor;
                if (t1 === t2) {
                    const keySq = `${l}/${t1}²` as AccelerationUnitKey;
                    assertIsAccelerationUnitKey(keySq);
                    acc[keySq] = keySq;
                    conversionFactorsBuilder[keySq] = factor;
                }
            });
        });
        return acc;
    },
    {} as Record<AccelerationUnitKey, AccelerationUnitKey>,
) as AccelerationUnitEnum;
Object.freeze(AccelerationUnit);

const accelerationUnitConversionFactors =
    conversionFactorsBuilder as ConversionFactors<AccelerationUnitEnum>;
Object.freeze(accelerationUnitConversionFactors);

class ScalarAcceleration extends Scalar<typeof AccelerationUnit> {
    static readonly #convert = makeScalarConversions<
        typeof AccelerationUnit,
        ScalarAcceleration
    >(
        accelerationUnitConversionFactors,
        ({ value, unit }) => new ScalarAcceleration({ value, unit }),
    );

    constructor({ value, unit }: ScalarBuilder<typeof AccelerationUnit>) {
        super({ value, unit });
    }

    static get dimensions(): Dimensionality {
        return dimensionalityRatio(Speed.dimensions, Time.dimensions);
    }

    convert(to: keyof typeof AccelerationUnit): ScalarAcceleration {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return ScalarAcceleration.#convert(this, to);
    }
}

class Acceleration extends Vector3D<typeof AccelerationUnit> {
    static readonly #convert = makeVectorConversions<
        typeof AccelerationUnit,
        Acceleration
    >(
        accelerationUnitConversionFactors,
        ({ x, y, z, unit }) => new Acceleration({ x, y, z, unit }),
    );

    constructor({
        x = 0,
        y = 0,
        z = 0,
        unit = AccelerationUnit['m/s²' as keyof typeof AccelerationUnit],
    }: Partial<Vector3DBuilder<typeof AccelerationUnit>>) {
        super({ x, y, z, unit });
    }

    get magnitude(): ScalarAcceleration {
        return new ScalarAcceleration(this.magnitudeBuilder);
    }

    static get dimensions(): Dimensionality {
        return ScalarAcceleration.dimensions;
    }

    convert(unit: keyof typeof AccelerationUnit): Acceleration {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Acceleration.#convert(this, unit);
    }
}
export {
    Acceleration,
    AccelerationUnit,
    ScalarAcceleration,
    accelerationUnitConversionFactors,
    assertIsAccelerationUnitKey,
};
