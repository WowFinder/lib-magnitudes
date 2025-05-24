import {
    type PrefixSpec,
    UnitPrefixes,
    bestPrefixByValue,
    prefixMatchers,
} from '../Units/Prefix';
import { type KeyAsValueObject, type Parser } from './helpers';

const prefixedScalarMatcher = new RegExp(
    `^([+-]?[0-9]+(?:\\.[0-9]*)?(?:[eE][+-]?[0-9]+)?)\\s*${prefixMatchers.capturingOptional}(\\p{L}*)$`,
    'u',
);

const unprefixedScalarMatcher = new RegExp(
    '^([+-]?[0-9]+(?:\\.[0-9]*)?(?:[eE][+-]?[0-9]+)?)\\s*(\\p{L}*)$',
    'u',
);

const defaultPrecision = 3;

interface ScalarBuilder<T extends KeyAsValueObject<keyof T & string>> {
    value: number;
    unit: keyof T;
}

class BaseScalar<T extends KeyAsValueObject<keyof T & string>> {
    #value: number;
    #unit: keyof T;
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
        return `${value.toFixed(digits)} ${prefix.symbol}${String(this.#unit)}`;
    }

    toString(): string {
        return this.toPrefixedString(defaultPrecision);
    }

    static parse<T extends KeyAsValueObject<keyof T & string>>(
        input: string,
        unitParser: Parser<keyof T>,
    ): BaseScalar<T> {
        const prefixedMatch = input.match(prefixedScalarMatcher);
        const unprefixedMatch = input.match(unprefixedScalarMatcher);

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

    static tryParse<T extends KeyAsValueObject<keyof T & string>>(
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

abstract class Scalar<
    T extends KeyAsValueObject<keyof T & string>,
> extends BaseScalar<T> {
    abstract convert(to: keyof T): Scalar<T>;
}

export type { ScalarBuilder };
export { BaseScalar, Scalar };
