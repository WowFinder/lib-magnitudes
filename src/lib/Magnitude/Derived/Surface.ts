import {
    type ConversionFactors,
    type Dimensionality,
    makeScalarConversions,
    makeVectorConversions,
    productDimensionality,
    Scalar,
    type ScalarBuilder,
    Vector3D,
    type Vector3DBuilder,
} from '../../core';
import { type KeyAsValueObject } from '../../core/helpers';
import { Length, lengthConversionFactors, LengthUnit } from '../Base/Length';

type AreaUnitKey = `${keyof typeof LengthUnit}²`;
const lengthUnitKeys = Object.keys(LengthUnit);
const lengthUnitMatcher = `(${lengthUnitKeys.join('|')})`;
const areaUnitKeyRegEx = new RegExp(`^${lengthUnitMatcher}²$`);

function assertIsAreaUnitKey(key: string): asserts key is AreaUnitKey {
    if (!areaUnitKeyRegEx.test(key)) {
        throw new Error(`Invalid Area Unit Key: ${key}`);
    }
}

type AreaUnitEnum = KeyAsValueObject<AreaUnitKey>;

const conversionFactorsBuilder = {} as Record<AreaUnitKey, number>;
function lengthFactor(key: string): number {
    return lengthConversionFactors[key as keyof typeof lengthConversionFactors];
}

const AreaUnit = Object.keys(LengthUnit).reduce(
    (acc, l) => {
        const key = `${l}²` as AreaUnitKey;
        assertIsAreaUnitKey(key);
        acc[key] = key;
        conversionFactorsBuilder[key] = Math.pow(lengthFactor(l), 2);
        return acc;
    },
    {} as Record<AreaUnitKey, AreaUnitKey>,
) as AreaUnitEnum;
Object.freeze(AreaUnit);

const areaUnitConversionFactors =
    conversionFactorsBuilder as ConversionFactors<AreaUnitEnum>;
Object.freeze(areaUnitConversionFactors);

type AreaBuilder = ScalarBuilder<typeof AreaUnit>;
class Area extends Scalar<AreaUnitEnum> {
    static readonly #convert = makeScalarConversions<AreaUnitEnum, Area>(
        areaUnitConversionFactors,
        ({ value, unit }) => new Area({ value, unit }),
    );

    constructor({ value, unit }: AreaBuilder) {
        super({ value, unit });
    }

    static get dimensions(): Dimensionality {
        return productDimensionality(Length.dimensions, Length.dimensions);
    }
    convert(unit: AreaUnitKey): Area {
        assertIsAreaUnitKey(unit);
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Area.#convert(this, unit);
    }
}

type SurfaceBuilder = Vector3DBuilder<typeof AreaUnit>;
class Surface extends Vector3D<typeof AreaUnit> {
    static readonly #convert = makeVectorConversions<typeof AreaUnit, Surface>(
        areaUnitConversionFactors,
        ({ x, y, z, unit }) => new Surface({ x, y, z, unit }),
    );

    constructor({ x, y, z, unit }: SurfaceBuilder) {
        super({ x, y, z, unit });
    }

    static get dimensions(): Dimensionality {
        return productDimensionality(Length.dimensions, Length.dimensions);
    }

    convert(unit: AreaUnitKey): Surface {
        assertIsAreaUnitKey(unit);
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Surface.#convert(this, unit);
    }
}

export {
    Area,
    AreaUnit,
    Surface,
    areaUnitConversionFactors,
    assertIsAreaUnitKey,
    type SurfaceBuilder,
    type AreaBuilder,
};
