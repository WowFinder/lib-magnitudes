import {
    type ScalarConversion,
    type ConversionFactors,
    makeScalarConversions,
    Scalar,
    type ScalarBuilder,
    type Dimensionality,
    dimensionalityRatio,
} from '../../core';
import { ElectricCharge } from './ElectricCharge';
import { Voltage } from './Voltage';

const CapacitanceUnit = {
    F: 'F',
} as const;
Object.freeze(CapacitanceUnit);

const capacitanceConversionFactors: ConversionFactors<typeof CapacitanceUnit> =
    {
        F: 1,
    } as const;
Object.freeze(capacitanceConversionFactors);

class Capacitance extends Scalar<typeof CapacitanceUnit> {
    static #converter: ScalarConversion<typeof CapacitanceUnit, Capacitance>;
    constructor({ value, unit }: ScalarBuilder<typeof CapacitanceUnit>) {
        super({ value, unit });
    }

    static {
        Capacitance.#converter = makeScalarConversions<
            typeof CapacitanceUnit,
            Capacitance
        >(
            capacitanceConversionFactors,
            ({ value, unit }) =>
                new Capacitance({
                    value,
                    unit: unit,
                }),
        );
    }

    static get dimensions(): Dimensionality {
        return dimensionalityRatio(
            ElectricCharge.dimensions,
            Voltage.dimensions,
        );
    }

    convert(unit: keyof typeof CapacitanceUnit): Capacitance {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Capacitance.#converter(this, unit);
    }
}

export { CapacitanceUnit, Capacitance, capacitanceConversionFactors };
