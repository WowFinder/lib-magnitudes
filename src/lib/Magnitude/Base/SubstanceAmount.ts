import {
    type ScalarConversion,
    type ConversionFactors,
    makeScalarConversions,
    Scalar,
    type ScalarBuilder,
    type Dimensionality,
    fillDimensionality,
} from '../../core';

const SubstanceAmountUnit = {
    mol: 'mol',
} as const;
Object.freeze(SubstanceAmountUnit);

const substanceAmountConversionFactors: ConversionFactors<
    typeof SubstanceAmountUnit
> = {
    mol: 1,
} as const;
Object.freeze(substanceAmountConversionFactors);

class SubstanceAmount extends Scalar<typeof SubstanceAmountUnit> {
    static #converter: ScalarConversion<
        typeof SubstanceAmountUnit,
        SubstanceAmount
    >;

    constructor({ value, unit }: ScalarBuilder<typeof SubstanceAmountUnit>) {
        super({ value, unit });
    }

    static {
        SubstanceAmount.#converter = makeScalarConversions<
            typeof SubstanceAmountUnit,
            SubstanceAmount
        >(
            substanceAmountConversionFactors,
            ({ value, unit }) =>
                new SubstanceAmount({
                    value,
                    unit: unit,
                }),
        );
    }

    static get dimensions(): Dimensionality {
        return fillDimensionality({ N: 1 });
    }

    convert(unit: keyof typeof SubstanceAmountUnit): SubstanceAmount {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return SubstanceAmount.#converter(this, unit);
    }
}

export {
    SubstanceAmountUnit,
    SubstanceAmount,
    substanceAmountConversionFactors,
};
