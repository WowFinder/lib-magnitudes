import {
    type Conversion,
    type ConversionFactors,
    type Dimensionality,
    fillDimensionality,
    makeConversions,
    Scalar,
    type ScalarBuilder,
} from '../../core';
import { timeConversionFactors } from '../Base';

const EnergyUnit = {
    J: 'J',
    Wh: 'Wh',
} as const;
Object.freeze(EnergyUnit);

const energyConversionFactors: ConversionFactors<typeof EnergyUnit> = {
    J: 1,
    Wh: timeConversionFactors.h,
} as const;
Object.freeze(energyConversionFactors);

class Energy extends Scalar<typeof EnergyUnit> {
    static #converter: Conversion<typeof EnergyUnit, Energy>;
    constructor({ value, unit }: ScalarBuilder<typeof EnergyUnit>) {
        super({ value, unit });
    }

    static {
        Energy.#converter = makeConversions<typeof EnergyUnit, Energy>(
            energyConversionFactors,
            ({ value, unit }) => new Energy({ value, unit }),
        );
    }

    static get dimensions(): Dimensionality {
        // TODO: compute from the work definition (force * length)
        return fillDimensionality({ M: 1, L: 2, T: -2 });
    }

    convert(unit: keyof typeof EnergyUnit): Energy {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Energy.#converter(this, unit);
    }
}

export { EnergyUnit, Energy, energyConversionFactors };
