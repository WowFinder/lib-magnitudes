import {
    type ScalarConversion,
    type ConversionFactors,
    makeScalarConversions,
    Scalar,
    type ScalarBuilder,
    type Dimensionality,
    dimensionalityRatio,
} from '../../core';
import { Time } from '../Base';
import { Energy } from './Energy';

const PowerUnit = {
    W: 'W',
} as const;
Object.freeze(PowerUnit);

const powerConversionFactors: ConversionFactors<typeof PowerUnit> = {
    W: 1,
} as const;
Object.freeze(powerConversionFactors);

class Power extends Scalar<typeof PowerUnit> {
    static #converter: ScalarConversion<typeof PowerUnit, Power>;
    constructor({ value, unit }: ScalarBuilder<typeof PowerUnit>) {
        super({ value, unit });
    }

    static {
        Power.#converter = makeScalarConversions<typeof PowerUnit, Power>(
            powerConversionFactors,
            ({ value, unit }) => new Power({ value, unit }),
        );
    }

    static get dimensions(): Dimensionality {
        return dimensionalityRatio(Energy.dimensions, Time.dimensions);
    }

    convert(unit: keyof typeof PowerUnit): Power {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Power.#converter(this, unit);
    }
}

export { PowerUnit, Power, powerConversionFactors };
