import {
    type Conversion,
    type ConversionFactors,
    makeConversions,
    Scalar,
    type ScalarBuilder,
} from '../../core';
import { type Dimensionality, fillDimensionality } from '../../Units';

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
    static #converter: Conversion<typeof ElectricCurrentUnit, ElectricCurrent>;
    constructor({ value, unit }: ScalarBuilder<typeof ElectricCurrentUnit>) {
        super({ value, unit });
    }

    static {
        ElectricCurrent.#converter = makeConversions<
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
