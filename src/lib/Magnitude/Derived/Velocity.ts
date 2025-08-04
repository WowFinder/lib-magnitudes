import {
    type ConversionFactors,
    type Dimensionality,
    dimensionalityRatio,
    makeScalarConversions,
    makeVectorConversions,
    Scalar,
    type ScalarBuilder,
    Vector3D,
    type Vector3DBuilder,
} from '../../core';
import { type KeyAsValueObject } from '../../core/StrictEnum';
import {
    Length,
    lengthConversionFactors,
    LengthUnit,
    Time,
    TimeUnit,
    timeUnitConversionFactors,
} from '../Base';

type SpeedUnitKey = `${keyof typeof LengthUnit}/${keyof typeof TimeUnit}`;
const lengthUnit = Object.keys(LengthUnit);
const timeUnit = Object.keys(TimeUnit);
const speedUnitKeyRegEx = new RegExp(
    `^(${lengthUnit.join('|')})/(${timeUnit.join('|')})$`,
);

function assertIsSpeedUnitKey(key: string): asserts key is SpeedUnitKey {
    if (!speedUnitKeyRegEx.test(key)) {
        throw new Error(`Invalid SpeedUnit key: ${key}`);
    }
}
type SpeedUnitEnum = KeyAsValueObject<SpeedUnitKey>;

const SpeedUnit: SpeedUnitEnum = Object.keys(LengthUnit).reduce((acc, l) => {
    Object.keys(TimeUnit).forEach(t => {
        const key = `${l}/${t}`;
        assertIsSpeedUnitKey(key);
        (acc as any)[key] = key;
    });
    return acc;
}, {} as SpeedUnitEnum);
Object.freeze(SpeedUnit);

const speedUnitConversionFactors: ConversionFactors<SpeedUnitEnum> =
    Object.keys(SpeedUnit).reduce(
        (acc, key) => {
            assertIsSpeedUnitKey(key);
            const [l, t] = key.split('/');
            const lengthFactor =
                lengthConversionFactors[
                    l as keyof typeof lengthConversionFactors
                ];
            const timeFactor =
                timeUnitConversionFactors[
                    t as keyof typeof timeUnitConversionFactors
                ];
            acc[key] = lengthFactor / timeFactor;
            return acc;
        },
        {} as Record<SpeedUnitEnum[keyof SpeedUnitEnum], number>,
    );
Object.freeze(speedUnitConversionFactors);

class Speed extends Scalar<typeof SpeedUnit> {
    static readonly #convert = makeScalarConversions<typeof SpeedUnit, Speed>(
        speedUnitConversionFactors,
        ({ value, unit }) => new Speed({ value, unit }),
    );

    constructor({ value, unit }: ScalarBuilder<typeof SpeedUnit>) {
        super({ value, unit });
    }

    static get dimensions(): Dimensionality {
        return dimensionalityRatio(Length.dimensions, Time.dimensions);
    }

    convert(to: keyof typeof SpeedUnit): Speed {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Speed.#convert(this, to);
    }
}
class Velocity extends Vector3D<typeof SpeedUnit> {
    static readonly #convert = makeVectorConversions<
        typeof SpeedUnit,
        Velocity
    >(
        speedUnitConversionFactors,
        ({ x, y, z, unit }) => new Velocity({ x, y, z, unit }),
    );

    constructor({
        x = 0,
        y = 0,
        z = 0,
        unit = SpeedUnit['m/s' as keyof typeof SpeedUnit],
    }: Partial<Vector3DBuilder<typeof SpeedUnit>>) {
        super({ x, y, z, unit });
    }

    get magnitude(): Speed {
        return new Speed(this.magnitudeBuilder);
    }

    static get dimensions(): Dimensionality {
        return Speed.dimensions;
    }

    convert(unit: keyof typeof SpeedUnit): Velocity {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Velocity.#convert(this, unit);
    }
}

export {
    Velocity,
    SpeedUnit,
    Speed,
    speedUnitConversionFactors,
    assertIsSpeedUnitKey,
};
