import { BaseScalar, type Scalar, type ScalarBuilder } from './Scalar';
import { type Vector3DBuilder, type Vector3D } from './Vector3D';
import { type StrictEnum } from './helpers';

type ScalarConversion<
    T extends StrictEnum<T>,
    R extends Scalar<T> = Scalar<T>,
> = (magnitude: BaseScalar<T>, to: keyof T) => R;

type VectorConversion<
    T extends StrictEnum<T>,
    R extends Vector3D<T> = Vector3D<T>,
> = (vector: Vector3D<T>, to: keyof T) => R;

type ConversionFactors<T extends StrictEnum<T>> = Readonly<
    Record<keyof T, number>
>;

function makeScalarConversions<
    T extends StrictEnum<T>,
    R extends Scalar<T> = Scalar<T>,
>(
    factors: {
        [keys in keyof T]: number;
    },
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
    return (vector: Vector3D<T>, to: keyof T): R => {
        const factor = factors[vector.unit] / factors[to];
        const x = vector.x * factor;
        const y = vector.y * factor;
        const z = vector.z * factor;
        return constructor({ x, y, z, unit: to });
    };
}

// TODO: Refactor as static method on Scalar
function add<T extends StrictEnum<T>, R extends Scalar<T> = Scalar<T>>(
    conversion: ScalarConversion<T, R>,
    unit: keyof T,
    ...magnitudes: BaseScalar<T>[]
): R {
    const value = magnitudes.reduce((sum, magnitude) => {
        const converted = conversion(magnitude, unit);
        return sum + converted.value;
    }, 0);
    return conversion(new BaseScalar({ value, unit }), unit);
}

export {
    type ScalarConversion,
    type VectorConversion,
    type ConversionFactors,
    makeScalarConversions,
    makeVectorConversions,
    add,
};
