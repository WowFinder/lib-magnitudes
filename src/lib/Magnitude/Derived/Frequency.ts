import {
    type ScalarConversion,
    type ConversionFactors,
    makeScalarConversions,
    Scalar,
    type ScalarBuilder,
    type Dimensionality,
    fillDimensionality,
} from '../../core';

const FrequencyUnit = {
    Hz: 'Hz',
} as const;
Object.freeze(FrequencyUnit);

const frequencyConversionFactors: ConversionFactors<typeof FrequencyUnit> = {
    Hz: 1,
} as const;
Object.freeze(frequencyConversionFactors);

class Frequency extends Scalar<typeof FrequencyUnit> {
    static #converter: ScalarConversion<typeof FrequencyUnit, Frequency>;
    constructor({ value, unit }: ScalarBuilder<typeof FrequencyUnit>) {
        super({ value, unit });
    }

    static {
        Frequency.#converter = makeScalarConversions<
            typeof FrequencyUnit,
            Frequency
        >(
            frequencyConversionFactors,
            ({ value, unit }) =>
                new Frequency({
                    value,
                    unit: unit,
                }),
        );
    }

    static get dimensions(): Dimensionality {
        return fillDimensionality({ T: -1 });
    }

    convert(unit: keyof typeof FrequencyUnit): Frequency {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Frequency.#converter(this, unit);
    }
}

export { FrequencyUnit, Frequency, frequencyConversionFactors };
