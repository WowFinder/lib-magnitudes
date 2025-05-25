import {
    type Dimensionality,
    makeVectorConversions,
    Vector3D,
    type Vector3DBuilder,
} from '../../core';
import {
    ScalarAcceleration,
    ScalarAccelerationUnit,
    scalarAccelerationUnitConversionFactors,
} from './ScalarAcceleration';

class Acceleration extends Vector3D<typeof ScalarAccelerationUnit> {
    static readonly #convert = makeVectorConversions<
        typeof ScalarAccelerationUnit,
        Acceleration
    >(
        scalarAccelerationUnitConversionFactors,
        ({ x, y, z, unit }) => new Acceleration({ x, y, z, unit }),
    );

    constructor({
        x = 0,
        y = 0,
        z = 0,
        unit = ScalarAccelerationUnit[
            'm/s²' as keyof typeof ScalarAccelerationUnit
        ],
    }: Partial<Vector3DBuilder<typeof ScalarAccelerationUnit>>) {
        super({ x, y, z, unit });
    }

    get magnitude(): ScalarAcceleration {
        return new ScalarAcceleration(this.magnitudeBuilder);
    }

    static get dimensions(): Dimensionality {
        return ScalarAcceleration.dimensions;
    }

    convert(unit: keyof typeof ScalarAccelerationUnit): Acceleration {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Acceleration.#convert(this, unit);
    }
}
export {
    Acceleration,
    ScalarAccelerationUnit,
    scalarAccelerationUnitConversionFactors,
};
