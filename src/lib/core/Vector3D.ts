import { type StrictEnum } from './StrictEnum';
import { defaultPrecision } from './globals';
import { bestPrefixByValue, type PrefixSpec } from './Prefix';
import { type Scalar, type ScalarBuilder } from './Scalar';

type Coords3D = {
    x: number;
    y: number;
    z: number;
};

function zeroCoords(): Coords3D {
    return { x: 0, y: 0, z: 0 };
}

type Vector3DBuilder<T extends StrictEnum<T>> = Coords3D & {
    unit: keyof T;
};

class BaseVector3D<T extends StrictEnum<T>> implements Coords3D {
    readonly #x: number;
    readonly #y: number;
    readonly #z: number;
    readonly #unit: keyof T;

    constructor({ x, y, z, unit }: Vector3DBuilder<T>) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
        this.#unit = unit;
    }

    get x(): number {
        return this.#x;
    }

    get y(): number {
        return this.#y;
    }

    get z(): number {
        return this.#z;
    }

    get unit(): keyof T {
        return this.#unit;
    }

    toRawString(): string {
        return `(${this.#x}, ${this.#y}, ${this.#z}) ${String(this.#unit)}`;
    }

    toPrefixedString(digits: number, prefix?: PrefixSpec): string {
        const prefixes = {
            x: prefix ?? bestPrefixByValue(this.#x),
            y: prefix ?? bestPrefixByValue(this.#y),
            z: prefix ?? bestPrefixByValue(this.#z),
        } as const;
        const values = {
            x: this.#x / Math.pow(10, prefixes.x.exp),
            y: this.#y / Math.pow(10, prefixes.y.exp),
            z: this.#z / Math.pow(10, prefixes.z.exp),
        } as const;
        return (
            `(${values.x.toPrecision(digits)} ${prefixes.x.symbol}${String(this.#unit)}, ` +
            `${values.y.toPrecision(digits)} ${prefixes.y.symbol}${String(this.#unit)}, ` +
            `${values.z.toPrecision(digits)} ${prefixes.z.symbol}${String(this.#unit)})`
        );
    }

    toString(): string {
        return this.toPrefixedString(defaultPrecision);
    }

    protected get magnitudeBuilder(): ScalarBuilder<T> {
        return {
            value: Math.sqrt(this.#x ** 2 + this.#y ** 2 + this.#z ** 2),
            unit: this.#unit,
        };
    }
}

type Vector3DConstructor<T extends StrictEnum<T>, V extends Vector3D<T>> = (
    builder: Vector3DBuilder<T>,
) => V;
abstract class Vector3D<T extends StrictEnum<T>> extends BaseVector3D<T> {
    abstract convert(to: keyof T): Vector3D<T>;

    static add<T extends StrictEnum<T>, V extends Vector3D<T>>(
        builder: Vector3DConstructor<T, V>,
        targetUnit: keyof T,
        ...magnitudes: Vector3D<T>[]
    ): V {
        const value = magnitudes.reduce((sum, magnitude) => {
            const converted = magnitude.convert(targetUnit);
            return {
                x: sum.x + converted.x,
                y: sum.y + converted.y,
                z: sum.z + converted.z,
            };
        }, zeroCoords());
        return builder({ ...value, unit: targetUnit });
    }

    static scalarProduct<
        TV extends StrictEnum<TV>,
        V extends Vector3D<TV>,
        TS extends StrictEnum<TS>,
        S extends Scalar<TS>,
        TR extends StrictEnum<TR>,
        VR extends Vector3D<TR>,
    >(
        builder: Vector3DConstructor<TR, VR>,
        targetUnit: keyof TR,
        value: V,
        factor: S,
    ): VR {
        const f = factor.value;
        const scaled = {
            x: value.x * f,
            y: value.y * f,
            z: value.z * f,
        };
        return builder({ ...scaled, unit: targetUnit });
    }

    static dotProduct<
        T1 extends StrictEnum<T1>,
        T2 extends StrictEnum<T2>,
        TR extends StrictEnum<TR>,
        V1 extends Vector3D<T1>,
        V2 extends Vector3D<T2>,
        SR extends Scalar<TR>,
    >(
        builder: (value: ScalarBuilder<TR>) => SR,
        targetUnit: keyof TR,
        a: V1,
        b: V2,
    ): SR {
        const value = a.x * b.x + a.y * b.y + a.z * b.z;
        return builder({
            value,
            unit: targetUnit,
        });
    }

    static crossProduct<
        T1 extends StrictEnum<T1>,
        T2 extends StrictEnum<T2>,
        TR extends StrictEnum<TR>,
        V1 extends Vector3D<T1>,
        V2 extends Vector3D<T2>,
        VR extends Vector3D<TR>,
    >(
        builder: Vector3DConstructor<TR, VR>,
        targetUnit: keyof TR,
        a: V1,
        b: V2,
    ): VR {
        const value = {
            x: a.y * b.z - a.z * b.y,
            y: a.z * b.x - a.x * b.z,
            z: a.x * b.y - a.y * b.x,
        };
        return builder({ ...value, unit: targetUnit });
    }
}

export { Vector3D, BaseVector3D, type Vector3DBuilder };
