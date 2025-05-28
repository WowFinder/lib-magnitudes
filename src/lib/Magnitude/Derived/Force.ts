import {
    type ConversionFactors,
    Scalar,
    type ScalarConversion,
    type ScalarBuilder,
    makeScalarConversions,
    type Dimensionality,
    productDimensionality,
    Vector3D,
    type VectorConversion,
    type Vector3DBuilder,
    makeVectorConversions,
    UnitPrefixes,
} from '../../core';
import { Mass } from '../Base';
import { Acceleration } from './Acceleration';
import { g_0 } from '../../constants';
import { massConversionFactors } from '../Base';

const ForceUnit = {
    N: 'N',
    lbf: 'lbf',
} as const;
Object.freeze(ForceUnit);

// Reminder: mass conversion factors are based on grams (g), but the SI base unit is the kg
const lbToKg = massConversionFactors.lb / Math.pow(10, UnitPrefixes['k'].exp);

const forceConversionFactors: ConversionFactors<typeof ForceUnit> = {
    N: 1,
    lbf: g_0.convert('m/s²').value * lbToKg,
} as const;
Object.freeze(forceConversionFactors);

class ScalarForce extends Scalar<typeof ForceUnit> {
    static #converter: ScalarConversion<typeof ForceUnit, ScalarForce> =
        makeScalarConversions<typeof ForceUnit, ScalarForce>(
            forceConversionFactors,
            ({ value, unit }) => new ScalarForce({ value, unit }),
        );
    constructor({ value, unit }: ScalarBuilder<typeof ForceUnit>) {
        super({ value, unit });
    }

    static get dimensions(): Dimensionality {
        return productDimensionality(Mass.dimensions, Acceleration.dimensions);
    }

    convert(unit: keyof typeof ForceUnit): ScalarForce {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return ScalarForce.#converter(this, unit);
    }
}

class Force extends Vector3D<typeof ForceUnit> {
    static #converter: VectorConversion<typeof ForceUnit, Force> =
        makeVectorConversions<typeof ForceUnit, Force>(
            forceConversionFactors,
            ({ x, y, z, unit }) => new Force({ x, y, z, unit }),
        );

    constructor({
        x = 0,
        y = 0,
        z = 0,
        unit = ForceUnit.N,
    }: Partial<Vector3DBuilder<typeof ForceUnit>>) {
        super({ x, y, z, unit });
    }

    get magnitude(): ScalarForce {
        return new ScalarForce(this.magnitudeBuilder);
    }

    static get dimensions(): Dimensionality {
        return ScalarForce.dimensions;
    }

    convert(unit: keyof typeof ForceUnit): Force {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Force.#converter(this, unit);
    }
}

export { ForceUnit, ScalarForce, Force, forceConversionFactors };
