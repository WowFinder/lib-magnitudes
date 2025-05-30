import {
    type ScalarConversion,
    type ConversionFactors,
    makeScalarConversions,
    Scalar,
    type ScalarBuilder,
    type Dimensionality,
    fillDimensionality,
} from '../../core';

const LengthUnit = {
    // Base SI unit
    m: 'm',
    // Imperial / US units
    ft: 'ft',
    in: 'in',
    yd: 'yd',
    mile: 'mile',
    // Large astronomical units
    au: 'au', // Astronomical Unit
    ly: 'ly', // Light Year
    pc: 'pc', // Parsec
    // Microscopic units
    Å: 'Å', // Angstrom (10^-10 m)
    lp: 'lp', // Planck length (1.616255e-35 m)
} as const;
Object.freeze(LengthUnit);

const lengthConversionFactors: ConversionFactors<typeof LengthUnit> = {
    m: 1,
    ft: 0.3048,
    in: 0.0254,
    yd: 0.9144,
    mile: 1609.344,
    au: 149597870700,
    ly: 9.4607e15,
    pc: 3.0857e16,
    Å: 1e-10,
    lp: 1.616255e-35,
} as const;
Object.freeze(lengthConversionFactors);

class Length extends Scalar<typeof LengthUnit> {
    static #converter: ScalarConversion<typeof LengthUnit, Length>;
    constructor({ value, unit }: ScalarBuilder<typeof LengthUnit>) {
        super({ value, unit });
    }

    static {
        Length.#converter = makeScalarConversions<typeof LengthUnit, Length>(
            lengthConversionFactors,
            ({ value, unit }) => new Length({ value, unit }),
        );
    }

    static get dimensions(): Dimensionality {
        return fillDimensionality({ L: 1 });
    }

    convert(unit: keyof typeof LengthUnit): Length {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Length.#converter(this, unit);
    }
}
export { LengthUnit, lengthConversionFactors, Length };
