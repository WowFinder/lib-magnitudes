import {
    type ScalarConversion,
    type ConversionFactors,
    makeScalarConversions,
    Scalar,
    type ScalarBuilder,
    type Dimensionality,
    productDimensionality,
} from '../../core';
import { ElectricCurrent, Time, timeUnitConversionFactors } from '../Base';

const ElectricChargeUnit = {
    C: 'C',
    As: 'As',
    Ah: 'Ah',
} as const;
Object.freeze(ElectricChargeUnit);

const electricChargeConversionFactors: ConversionFactors<
    typeof ElectricChargeUnit
> = {
    C: 1,
    As: 1,
    Ah: timeUnitConversionFactors.h,
} as const;
Object.freeze(electricChargeConversionFactors);

class ElectricCharge extends Scalar<typeof ElectricChargeUnit> {
    static #converter: ScalarConversion<
        typeof ElectricChargeUnit,
        ElectricCharge
    >;
    constructor({ value, unit }: ScalarBuilder<typeof ElectricChargeUnit>) {
        super({ value, unit });
    }

    static {
        ElectricCharge.#converter = makeScalarConversions<
            typeof ElectricChargeUnit,
            ElectricCharge
        >(
            electricChargeConversionFactors,
            ({ value, unit }) =>
                new ElectricCharge({
                    value,
                    unit,
                }),
        );
    }

    static get dimensions(): Dimensionality {
        return productDimensionality(
            ElectricCurrent.dimensions,
            Time.dimensions,
        );
    }

    convert(unit: keyof typeof ElectricChargeUnit): ElectricCharge {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return ElectricCharge.#converter(this, unit);
    }
}

export { ElectricChargeUnit, ElectricCharge, electricChargeConversionFactors };
