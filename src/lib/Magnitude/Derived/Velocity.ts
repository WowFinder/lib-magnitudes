import {
    type Dimensionality,
    makeVectorConversions,
    Vector3D,
    type Vector3DBuilder,
} from '../../core';
import { Speed, SpeedUnit, speedUnitConversionFactors } from './Speed';

class Velocity extends Vector3D<typeof SpeedUnit> {
    static readonly #convert = makeVectorConversions<
        typeof SpeedUnit,
        Velocity
    >(
        speedUnitConversionFactors,
        ({ x, y, z, unit }) => new Velocity({ x, y, z, unit }),
    );

    constructor({
        x = 0,
        y = 0,
        z = 0,
        unit = SpeedUnit['m/s' as keyof typeof SpeedUnit],
    }: Partial<Vector3DBuilder<typeof SpeedUnit>>) {
        super({ x, y, z, unit });
    }

    get magnitude(): Speed {
        return new Speed(this.magnitudeBuilder);
    }

    static get dimensions(): Dimensionality {
        return Speed.dimensions;
    }

    convert(unit: keyof typeof SpeedUnit): Velocity {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Velocity.#convert(this, unit);
    }
}

export { Velocity, SpeedUnit, speedUnitConversionFactors };
