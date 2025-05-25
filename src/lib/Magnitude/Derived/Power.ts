import {
    type Conversion,
    type ConversionFactors,
    makeConversions,
    Scalar,
    type ScalarBuilder,
} from '../../core';
import { type Dimensionality, dimensionalityRatio } from '../../Units';
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
    static #converter: Conversion<typeof PowerUnit, Power>;
    constructor({ value, unit }: ScalarBuilder<typeof PowerUnit>) {
        super({ value, unit });
    }

    static {
        Power.#converter = makeConversions<typeof PowerUnit, Power>(
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
