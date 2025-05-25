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

type AccelerationUnitKey =
    `${keyof typeof LengthUnit}/${keyof typeof TimeUnit}²`;
const lengthUnit = Object.keys(LengthUnit);
const timeUnit = Object.keys(TimeUnit);
const accelerationUnitKeyRegEx = new RegExp(
    `^(${lengthUnit.join('|')})/(${timeUnit.join('|')})²$`,
);
function assertIsAccelerationUnitKey(
    key: string,
): asserts key is AccelerationUnitKey {
    if (!accelerationUnitKeyRegEx.test(key)) {
        throw new Error(`Invalid AccelerationUnit key: ${key}`);
    }
}
type AccelerationUnitEnum = KeyAsValueObject<AccelerationUnitKey>;
const AccelerationUnit: AccelerationUnitEnum = Object.keys(
    LengthUnit,
).reduce((acc, l) => {
    Object.keys(TimeUnit).forEach(t => {
        const key = `${l}/${t}²` as AccelerationUnitKey;
        assertIsAccelerationUnitKey(key);
        (acc as any)[key] = key;
    });
    return acc;
}, {} as AccelerationUnitEnum);
Object.freeze(AccelerationUnit);

const accelerationUnitConversionFactors: ConversionFactors<AccelerationUnitEnum> =
    Object.keys(AccelerationUnit).reduce(
        (acc, key) => {
            assertIsAccelerationUnitKey(key);
            const parsed = accelerationUnitKeyRegEx.exec(key)!;
            const [, l, t] = parsed;
            const lengthFactor =
                lengthConversionFactors[
                    l as keyof typeof lengthConversionFactors
                ];
            const timeFactor =
                timeUnitConversionFactors[
                    t as keyof typeof timeUnitConversionFactors
                ];
            acc[key] = lengthFactor / Math.pow(timeFactor, 2);
            return acc;
        },
        {} as Record<
            AccelerationUnitEnum[keyof AccelerationUnitEnum],
            number
        >,
    );
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

export {
    AccelerationUnit,
    ScalarAcceleration,
    accelerationUnitConversionFactors,
    assertIsAccelerationUnitKey,
};
