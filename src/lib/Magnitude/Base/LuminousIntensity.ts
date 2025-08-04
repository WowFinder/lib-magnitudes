import {
    type ScalarConversion,
    type ConversionFactors,
    makeScalarConversions,
    Scalar,
    type ScalarBuilder,
    type Dimensionality,
    fillDimensionality,
} from '../../core';

const LuminousIntensityUnit = {
    cd: 'cd',
} as const;

const luminousIntensityConversionFactors: ConversionFactors<
    typeof LuminousIntensityUnit
> = {
    cd: 1,
} as const;

class LuminousIntensity extends Scalar<typeof LuminousIntensityUnit> {
    static #converter: ScalarConversion<
        typeof LuminousIntensityUnit,
        LuminousIntensity
    >;

    constructor({ value, unit }: ScalarBuilder<typeof LuminousIntensityUnit>) {
        super({ value, unit });
    }

    static {
        LuminousIntensity.#converter = makeScalarConversions<
            typeof LuminousIntensityUnit,
            LuminousIntensity
        >(
            luminousIntensityConversionFactors,
            ({ value, unit }) =>
                new LuminousIntensity({
                    value,
                    unit,
                }),
        );
    }

    static get dimensions(): Dimensionality {
        return fillDimensionality({ J: 1 });
    }

    convert(unit: keyof typeof LuminousIntensityUnit): LuminousIntensity {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return LuminousIntensity.#converter(this, unit);
    }
}

export {
    LuminousIntensityUnit,
    LuminousIntensity,
    luminousIntensityConversionFactors,
};
