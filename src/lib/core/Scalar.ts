import {
    type PrefixSpec,
    UnitPrefixes,
    bestPrefixByValue,
    prefixMatchers,
} from './Prefix';
import { defaultPrecision } from './globals';
import { type StrictEnum } from './StrictEnum';
import { type Parser } from './Parser';

const prefixedScalarMatcher = new RegExp(
    `^([+-]?\\d+(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)\\s*${prefixMatchers.capturingOptional}(\\p{L}*)$`,
    'u',
);

const unprefixedScalarMatcher =
    /^([+-]?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*(\p{L}*)$/u;

type ScalarBuilder<T extends StrictEnum<T>> = {
    readonly value: number;
    readonly unit: keyof T;
};

class BaseScalar<T extends StrictEnum<T>> {
    readonly #value: number;
    readonly #unit: keyof T;

    constructor({ value, unit }: ScalarBuilder<T>) {
        this.#value = value;
        this.#unit = unit;
    }

    get value(): number {
        return this.#value;
    }

    get unit(): keyof T {
        return this.#unit;
    }

    toRawString(): string {
        return `${this.#value} ${String(this.#unit)}`;
    }

    toPrefixedString(digits: number, prefix?: PrefixSpec): string {
        prefix ??= bestPrefixByValue(this.#value);
        const value = this.#value / Math.pow(10, prefix.exp);
        return `${value.toPrecision(digits)} ${prefix.symbol}${String(this.#unit)}`;
    }

    toString(): string {
        return this.toPrefixedString(defaultPrecision);
    }

    static parse<T extends StrictEnum<T>>(
        input: string,
        unitParser: Parser<keyof T>,
    ): BaseScalar<T> {
        const prefixedMatch = prefixedScalarMatcher.exec(input);
        const unprefixedMatch = unprefixedScalarMatcher.exec(input);

        let err = undefined as Error | undefined;

        try {
            if (prefixedMatch) {
                const [, givenValue, prefix, unit] = prefixedMatch;
                const value =
                    parseFloat(givenValue) *
                    Math.pow(10, UnitPrefixes[prefix].exp);
                return new BaseScalar({ value, unit: unitParser(unit) });
            }
        } catch (e) {
            err = e as Error;
            if (unprefixedMatch) {
                const [, givenValue, unit] = unprefixedMatch;
                const value = parseFloat(givenValue);
                return new BaseScalar({ value, unit: unitParser(unit) });
            }
        }

        throw err ?? new Error(`Invalid scalar format: ${input}`);
    }

    static tryParse<T extends StrictEnum<T>>(
        input: string,
        unitParser: Parser<keyof T>,
    ): BaseScalar<T> | undefined {
        try {
            return BaseScalar.parse(input, unitParser);
        } catch {
            return undefined;
        }
    }
}

type ScalarConstructor<T extends StrictEnum<T>, S extends Scalar<T>> = (
    builder: ScalarBuilder<T>,
) => S;
abstract class Scalar<T extends StrictEnum<T>> extends BaseScalar<T> {
    abstract convert(to: keyof T): Scalar<T>;
    static add<T extends StrictEnum<T>, S extends Scalar<T>>(
        builder: ScalarConstructor<T, S>,
        targetUnit: keyof T,
        ...magnitudes: Scalar<T>[]
    ): S {
        const value = magnitudes.reduce((sum, magnitude) => {
            const converted = magnitude.convert(targetUnit);
            return sum + converted.value;
        }, 0);
        return builder({ value, unit: targetUnit });
    }
}

export type { ScalarBuilder, ScalarConstructor };
export { BaseScalar, Scalar };
