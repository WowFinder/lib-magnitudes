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
import { Energy } from './Energy';

const VoltageUnit = {
    V: 'V',
} as const;
Object.freeze(VoltageUnit);

const voltageConversionFactors: ConversionFactors<typeof VoltageUnit> = {
    V: 1,
} as const;
Object.freeze(voltageConversionFactors);

class Voltage extends Scalar<typeof VoltageUnit> {
    static #converter: ScalarConversion<typeof VoltageUnit, Voltage>;
    constructor({ value, unit }: ScalarBuilder<typeof VoltageUnit>) {
        super({ value, unit });
    }

    static {
        Voltage.#converter = makeScalarConversions<typeof VoltageUnit, Voltage>(
            voltageConversionFactors,
            ({ value, unit }) => new Voltage({ value, unit }),
        );
    }

    static get dimensions(): Dimensionality {
        return dimensionalityRatio(
            Energy.dimensions,
            ElectricCharge.dimensions,
        );
    }

    convert(unit: keyof typeof VoltageUnit): Voltage {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Voltage.#converter(this, unit);
    }
}

export { VoltageUnit, Voltage, voltageConversionFactors };
