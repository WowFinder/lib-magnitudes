import {
    type ScalarConversion,
    type ConversionFactors,
    makeScalarConversions,
    Scalar,
    type ScalarBuilder,
    type Dimensionality,
    dimensionalityRatio,
} from '../../core';
import { ElectricCurrent } from '../Base';
import { Voltage } from './Voltage';

const ElectricResistanceUnit = {
    Ω: 'Ω',
} as const;
Object.freeze(ElectricResistanceUnit);

const electricResistanceConversionFactors: ConversionFactors<
    typeof ElectricResistanceUnit
> = {
    Ω: 1,
} as const;
Object.freeze(electricResistanceConversionFactors);

class ElectricResistance extends Scalar<typeof ElectricResistanceUnit> {
    static #converter: ScalarConversion<
        typeof ElectricResistanceUnit,
        ElectricResistance
    >;
    constructor({ value, unit }: ScalarBuilder<typeof ElectricResistanceUnit>) {
        super({ value, unit });
    }

    static {
        ElectricResistance.#converter = makeScalarConversions<
            typeof ElectricResistanceUnit,
            ElectricResistance
        >(
            electricResistanceConversionFactors,
            ({ value, unit }) =>
                new ElectricResistance({
                    value,
                    unit: unit,
                }),
        );
    }

    static get dimensions(): Dimensionality {
        return dimensionalityRatio(
            Voltage.dimensions,
            ElectricCurrent.dimensions,
        );
    }

    convert(unit: keyof typeof ElectricResistanceUnit): ElectricResistance {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return ElectricResistance.#converter(this, unit);
    }
}

export {
    ElectricResistanceUnit,
    ElectricResistance,
    electricResistanceConversionFactors,
};
