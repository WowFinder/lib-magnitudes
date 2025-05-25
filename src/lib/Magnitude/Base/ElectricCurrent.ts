import {
    type ScalarConversion,
    type ConversionFactors,
    makeScalarConversions,
    Scalar,
    type ScalarBuilder,
    type Dimensionality,
    fillDimensionality,
} from '../../core';

const ElectricCurrentUnit = {
    A: 'A',
} as const;
Object.freeze(ElectricCurrentUnit);

const electricCurrentConversionFactors: ConversionFactors<
    typeof ElectricCurrentUnit
> = {
    A: 1,
} as const;
Object.freeze(electricCurrentConversionFactors);

class ElectricCurrent extends Scalar<typeof ElectricCurrentUnit> {
    static #converter: ScalarConversion<
        typeof ElectricCurrentUnit,
        ElectricCurrent
    >;
    constructor({ value, unit }: ScalarBuilder<typeof ElectricCurrentUnit>) {
        super({ value, unit });
    }

    static {
        ElectricCurrent.#converter = makeScalarConversions<
            typeof ElectricCurrentUnit,
            ElectricCurrent
        >(
            electricCurrentConversionFactors,
            ({ value, unit }) =>
                new ElectricCurrent({
                    value,
                    unit: unit,
                }),
        );
    }

    static get dimensions(): Dimensionality {
        return fillDimensionality({ I: 1 });
    }

    convert(unit: keyof typeof ElectricCurrentUnit): ElectricCurrent {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return ElectricCurrent.#converter(this, unit);
    }
}

export {
    ElectricCurrentUnit,
    ElectricCurrent,
    electricCurrentConversionFactors,
};
