import {
    type Dimensionality,
    makeVectorConversions,
    Vector3D,
    type Vector3DBuilder,
} from '../../core';
import { Length, lengthConversionFactors, LengthUnit } from './Length';

class Position extends Vector3D<typeof LengthUnit> {
    static readonly #convert = makeVectorConversions<
        typeof LengthUnit,
        Position
    >(
        lengthConversionFactors,
        ({ x, y, z, unit }) => new Position({ x, y, z, unit }),
    );

    constructor({
        x = 0,
        y = 0,
        z = 0,
        unit = LengthUnit.m,
    }: Partial<Vector3DBuilder<typeof LengthUnit>>) {
        super({ x, y, z, unit });
    }

    get magnitude(): Length {
        return new Length(this.magnitudeBuilder);
    }

    static get dimensions(): Dimensionality {
        return Length.dimensions;
    }

    convert(unit: keyof typeof LengthUnit): Position {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Position.#convert(this, unit);
    }
}

export { Position };
