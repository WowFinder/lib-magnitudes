import {
    type ConversionFactors,
    type Dimensionality,
    dimensionalityRatio,
    makeScalarConversions,
    Scalar,
    type ScalarBuilder,
} from '../../core';
import { type KeyAsValueObject } from '../../core/helpers';

import {
    lengthConversionFactors,
    LengthUnit,
    Time,
    TimeUnit,
    timeUnitConversionFactors,
} from '../Base';
import { Speed } from './Speed';

type ScalarAccelerationUnitKey =
    `${keyof typeof LengthUnit}/${keyof typeof TimeUnit}²`;
const lengthUnit = Object.keys(LengthUnit);
const timeUnit = Object.keys(TimeUnit);
const accelerationUnitKeyRegEx = new RegExp(
    `^(${lengthUnit.join('|')})/(${timeUnit.join('|')})²$`,
);
function assertIsScalarAccelerationUnitKey(
    key: string,
): asserts key is ScalarAccelerationUnitKey {
    if (!accelerationUnitKeyRegEx.test(key)) {
        throw new Error(`Invalid ScalarAccelerationUnit key: ${key}`);
    }
}
type ScalarAccelerationUnitEnum = KeyAsValueObject<ScalarAccelerationUnitKey>;
const ScalarAccelerationUnit: ScalarAccelerationUnitEnum = Object.keys(
    LengthUnit,
).reduce((acc, l) => {
    Object.keys(TimeUnit).forEach(t => {
        const key = `${l}/${t}²` as ScalarAccelerationUnitKey;
        assertIsScalarAccelerationUnitKey(key);
        (acc as any)[key] = key;
    });
    return acc;
}, {} as ScalarAccelerationUnitEnum);
Object.freeze(ScalarAccelerationUnit);

const scalarAccelerationUnitConversionFactors: ConversionFactors<ScalarAccelerationUnitEnum> =
    Object.keys(ScalarAccelerationUnit).reduce((acc, key) => {
        assertIsScalarAccelerationUnitKey(key);
        const parsed = accelerationUnitKeyRegEx.exec(key)!;
        const [, l, t] = parsed;
        const lengthFactor =
            lengthConversionFactors[l as keyof typeof lengthConversionFactors];
        const timeFactor =
            timeUnitConversionFactors[
                t as keyof typeof timeUnitConversionFactors
            ];
        (acc as any)[key] = lengthFactor / Math.pow(timeFactor, 2);
        return acc;
    }, {} as ConversionFactors<ScalarAccelerationUnitEnum>);
Object.freeze(scalarAccelerationUnitConversionFactors);

class ScalarAcceleration extends Scalar<typeof ScalarAccelerationUnit> {
    static readonly #convert = makeScalarConversions<
        typeof ScalarAccelerationUnit,
        ScalarAcceleration
    >(
        scalarAccelerationUnitConversionFactors,
        ({ value, unit }) => new ScalarAcceleration({ value, unit }),
    );

    constructor({ value, unit }: ScalarBuilder<typeof ScalarAccelerationUnit>) {
        super({ value, unit });
    }

    static get dimensions(): Dimensionality {
        return dimensionalityRatio(Speed.dimensions, Time.dimensions);
    }

    convert(to: keyof typeof ScalarAccelerationUnit): ScalarAcceleration {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return ScalarAcceleration.#convert(this, to);
    }
}

export {
    ScalarAccelerationUnit,
    ScalarAcceleration,
    scalarAccelerationUnitConversionFactors,
    assertIsScalarAccelerationUnitKey,
};
