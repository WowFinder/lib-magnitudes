import {
    type Conversion,
    type ConversionFactors,
    makeConversions,
    Scalar,
    type ScalarBuilder,
} from '../../core';
import { ElectricCurrent, Time, timeConversionFactors } from '../Base';
import { type Dimensionality, productDimensionality } from '../../Units';

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
    Ah: timeConversionFactors.h,
} as const;
Object.freeze(electricChargeConversionFactors);

class ElectricCharge extends Scalar<typeof ElectricChargeUnit> {
    static #converter: Conversion<typeof ElectricChargeUnit, ElectricCharge>;
    constructor({ value, unit }: ScalarBuilder<typeof ElectricChargeUnit>) {
        super({ value, unit });
    }

    static {
        ElectricCharge.#converter = makeConversions<
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
