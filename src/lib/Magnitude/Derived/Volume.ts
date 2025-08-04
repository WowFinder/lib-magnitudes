import {
    type ConversionFactors,
    type Dimensionality,
    makeScalarConversions,
    productDimensionality,
    Scalar,
} from '../../core';
import { type KeyAsValueObject } from '../../core/StrictEnum';
import { Length, lengthConversionFactors, LengthUnit } from '../Base/Length';

type VolumeUnitKey = `${keyof typeof LengthUnit}³`;
const lengthUnitKeys = Object.keys(LengthUnit);
const lengthUnitMatcher = `(${lengthUnitKeys.join('|')})`;
const volumeUnitKeyRegEx = new RegExp(`^${lengthUnitMatcher}³$`);

function assertIsVolumeUnitKey(key: string): asserts key is VolumeUnitKey {
    if (!volumeUnitKeyRegEx.test(key)) {
        throw new Error(`Invalid Volume Unit Key: ${key}`);
    }
}

type VolumeUnitEnum = KeyAsValueObject<VolumeUnitKey>;

const conversionFactorsBuilder = {} as Record<VolumeUnitKey, number>;
function lengthFactor(key: string): number {
    return lengthConversionFactors[key as keyof typeof lengthConversionFactors];
}

const VolumeUnit = Object.keys(LengthUnit).reduce(
    (acc, l) => {
        const key = `${l}³` as VolumeUnitKey;
        assertIsVolumeUnitKey(key);
        acc[key] = key;
        conversionFactorsBuilder[key] = Math.pow(lengthFactor(l), 3);
        return acc;
    },
    {} as Record<VolumeUnitKey, VolumeUnitKey>,
) as VolumeUnitEnum;
Object.freeze(VolumeUnit);

const volumeUnitConversionFactors =
    conversionFactorsBuilder as ConversionFactors<VolumeUnitEnum>;
Object.freeze(volumeUnitConversionFactors);

class Volume extends Scalar<VolumeUnitEnum> {
    static readonly #convert = makeScalarConversions<VolumeUnitEnum, Volume>(
        volumeUnitConversionFactors,
        ({ value, unit }) => new Volume({ value, unit }),
    );

    constructor({ value, unit }: { value: number; unit: VolumeUnitKey }) {
        super({ value, unit });
    }

    static get dimensions(): Dimensionality {
        return productDimensionality(
            Length.dimensions,
            Length.dimensions,
            Length.dimensions,
        );
    }
    convert(unit: VolumeUnitKey): Volume {
        assertIsVolumeUnitKey(unit);
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Volume.#convert(this, unit);
    }
}
export {
    Volume,
    VolumeUnit,
    volumeUnitConversionFactors,
    assertIsVolumeUnitKey,
};
