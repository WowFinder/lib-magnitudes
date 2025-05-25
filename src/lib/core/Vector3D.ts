import { type KeyAsValueObject, defaultPrecision } from './helpers';
import { bestPrefixByValue, type PrefixSpec } from './Prefix';
import { type ScalarBuilder } from './Scalar';

type Vector3DBuilder<T extends KeyAsValueObject<keyof T & string>> = {
    x: number;
    y: number;
    z: number;
    unit: keyof T;
};

class BaseVector3D<T extends KeyAsValueObject<keyof T & string>> {
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

abstract class Vector3D<
    T extends KeyAsValueObject<keyof T & string>,
> extends BaseVector3D<T> {
    abstract convert(to: keyof T): Vector3D<T>;
}

export { Vector3D, BaseVector3D, type Vector3DBuilder };
