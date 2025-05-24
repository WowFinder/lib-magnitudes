import {
    type Conversion,
    type ConversionFactors,
    makeConversions,
    Scalar,
    type ScalarBuilder,
} from '../../core';

const VoltageUnit = {
    V: 'V',
} as const;
Object.freeze(VoltageUnit);

const voltageConversionFactors: ConversionFactors<typeof VoltageUnit> = {
    V: 1,
} as const;
Object.freeze(voltageConversionFactors);

class Voltage extends Scalar<typeof VoltageUnit> {
    static #converter: Conversion<typeof VoltageUnit, Voltage>;
    constructor({ value, unit }: ScalarBuilder<typeof VoltageUnit>) {
        super({ value, unit });
    }

    static {
        Voltage.#converter = makeConversions<typeof VoltageUnit, Voltage>(
            voltageConversionFactors,
            ({ value, unit }) =>
                new Voltage({ value, unit: unit as keyof typeof VoltageUnit }),
        );
    }

    convert(unit: keyof typeof VoltageUnit): Voltage {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Voltage.#converter(this, unit);
    }
}

export { VoltageUnit, Voltage, voltageConversionFactors };
