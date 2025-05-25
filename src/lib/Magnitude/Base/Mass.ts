import {
    type Conversion,
    type ConversionFactors,
    makeConversions,
    Scalar,
    type ScalarBuilder,
} from '../../core';
import { type Dimensionality, fillDimensionality } from '../../Units';

/* Note: while the SI base unit for mass is the kilogram (kg),
    the code uses the gram (g) as the basis for calculations.
    This is done mostly to avoid having to handle special cases
    for prefixes when dealing with mass.
*/
const MassUnit = {
    // SI unit
    g: 'g',
    // US customary units
    lb: 'lb',
    oz: 'oz',
    // TODO: Consider adding more units
} as const;
Object.freeze(MassUnit);

const massConversionFactors: ConversionFactors<typeof MassUnit> = {
    g: 1,
    lb: 453.59237, // 1 lb = 453.59237 g
    oz: 28.349523125, // 1 oz = 28.349523125 g
} as const;
Object.freeze(massConversionFactors);

class Mass extends Scalar<typeof MassUnit> {
    static #converter: Conversion<typeof MassUnit, Mass>;
    constructor({ value, unit }: ScalarBuilder<typeof MassUnit>) {
        super({ value, unit });
    }

    static {
        Mass.#converter = makeConversions<typeof MassUnit, Mass>(
            massConversionFactors,
            ({ value, unit }) => new Mass({ value, unit }),
        );
    }

    static get dimensions(): Dimensionality {
        return fillDimensionality({ M: 1 });
    }

    convert(unit: keyof typeof MassUnit): Mass {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Mass.#converter(this, unit);
    }
}

export { MassUnit, massConversionFactors, Mass };
