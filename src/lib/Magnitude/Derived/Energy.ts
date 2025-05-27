import {
    type ScalarConversion,
    type ConversionFactors,
    type Dimensionality,
    fillDimensionality,
    makeScalarConversions,
    Scalar,
    type ScalarBuilder,
} from '../../core';
import { timeUnitConversionFactors } from '../Base';

const EnergyUnit = {
    J: 'J',
    Wh: 'Wh',
    eV: 'eV',
} as const;
Object.freeze(EnergyUnit);

const energyConversionFactors: ConversionFactors<typeof EnergyUnit> = {
    J: 1,
    Wh: timeUnitConversionFactors.h,
    eV: 1.602176634e-19,
} as const;
Object.freeze(energyConversionFactors);

class Energy extends Scalar<typeof EnergyUnit> {
    static #converter: ScalarConversion<typeof EnergyUnit, Energy>;
    constructor({ value, unit }: ScalarBuilder<typeof EnergyUnit>) {
        super({ value, unit });
    }

    static {
        Energy.#converter = makeScalarConversions<typeof EnergyUnit, Energy>(
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
