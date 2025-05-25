import {
    type Dimensionality,
    makeVectorConversions,
    Vector3D,
} from '../../core';
import { Length, lengthConversionFactors, type LengthUnit } from './Length';

class Position extends Vector3D<typeof LengthUnit> {
    static #convert = makeVectorConversions<typeof LengthUnit, Position>(
        lengthConversionFactors,
        ({ x, y, z, unit }) => new Position({ x, y, z, unit }),
    );

    constructor({
        x,
        y,
        z,
        unit,
    }: {
        x: number;
        y: number;
        z: number;
        unit: keyof typeof LengthUnit;
    }) {
        super({ x, y, z, unit });
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
