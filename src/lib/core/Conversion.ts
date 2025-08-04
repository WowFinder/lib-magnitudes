import { type BaseScalar, type Scalar, type ScalarBuilder } from './Scalar';
import {
    type Vector3DBuilder,
    type Vector3D,
    type BaseVector3D,
} from './Vector3D';
import { type StrictEnum } from './StrictEnum';

type ScalarConversion<
    T extends StrictEnum<T>,
    R extends Scalar<T> = Scalar<T>,
> = (magnitude: BaseScalar<T>, to: keyof T) => R;

type VectorConversion<
    T extends StrictEnum<T>,
    R extends Vector3D<T> = Vector3D<T>,
> = (vector: BaseVector3D<T>, to: keyof T) => R;

type ConversionFactors<T extends StrictEnum<T>> = Readonly<
    Record<keyof T, number>
>;

function makeScalarConversions<
    T extends StrictEnum<T>,
    R extends Scalar<T> = Scalar<T>,
>(
    factors: ConversionFactors<T>,
    constructor: ({ value, unit }: ScalarBuilder<T>) => R,
): ScalarConversion<T, R> {
    return (magnitude: BaseScalar<T>, to: keyof T): R => {
        return constructor({
            value: (magnitude.value * factors[magnitude.unit]) / factors[to],
            unit: to,
        });
    };
}

function makeVectorConversions<
    T extends StrictEnum<T>,
    R extends Vector3D<T> = Vector3D<T>,
>(
    factors: ConversionFactors<T>,
    constructor: (builder: Vector3DBuilder<T>) => R,
): VectorConversion<T, R> {
    return (vector: BaseVector3D<T>, to: keyof T): R => {
        const factor = factors[vector.unit] / factors[to];
        const x = vector.x * factor;
        const y = vector.y * factor;
        const z = vector.z * factor;
        return constructor({ x, y, z, unit: to });
    };
}

export {
    type ScalarConversion,
    type VectorConversion,
    type ConversionFactors,
    makeScalarConversions,
    makeVectorConversions,
};
