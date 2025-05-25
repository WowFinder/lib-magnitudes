import {
    type Dimensionality,
    makeVectorConversions,
    Vector3D,
    type Vector3DBuilder,
} from '../../core';
import {
    ScalarAcceleration,
    AccelerationUnit,
    accelerationUnitConversionFactors,
} from './ScalarAcceleration';

class Acceleration extends Vector3D<typeof AccelerationUnit> {
    static readonly #convert = makeVectorConversions<
        typeof AccelerationUnit,
        Acceleration
    >(
        accelerationUnitConversionFactors,
        ({ x, y, z, unit }) => new Acceleration({ x, y, z, unit }),
    );

    constructor({
        x = 0,
        y = 0,
        z = 0,
        unit = AccelerationUnit['m/s²' as keyof typeof AccelerationUnit],
    }: Partial<Vector3DBuilder<typeof AccelerationUnit>>) {
        super({ x, y, z, unit });
    }

    get magnitude(): ScalarAcceleration {
        return new ScalarAcceleration(this.magnitudeBuilder);
    }

    static get dimensions(): Dimensionality {
        return ScalarAcceleration.dimensions;
    }

    convert(unit: keyof typeof AccelerationUnit): Acceleration {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Acceleration.#convert(this, unit);
    }
}
export { Acceleration };
