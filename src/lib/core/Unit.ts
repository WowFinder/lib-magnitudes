import {
    type Dimensionality,
    type DimensionalityBuilder,
    fillDimensionality,
    matchDimensionalities,
} from './Dimensionality';

// TODO: these types are WiP and not currently used by any exported code.

type Unit = {
    readonly dimensionality: Dimensionality;
    readonly baseConversionFactor: number;
    readonly symbol: string;
    readonly toString: () => string;
};

type UnitBuilder = {
    readonly dimensionality: DimensionalityBuilder;
    readonly symbol: string;
    readonly conversionFactor?: number;
    readonly conversionTargetUnit?: Unit;
};

class SimpleUnitImpl implements Unit {
    readonly #dimensionality: Dimensionality;
    readonly #baseConversionFactor: number;
    readonly #symbol: string;

    constructor({
        dimensionality,
        symbol,
        conversionFactor = 1,
        conversionTargetUnit,
    }: UnitBuilder) {
        this.#dimensionality = fillDimensionality(dimensionality);
        if (
            conversionTargetUnit &&
            !matchDimensionalities(
                this.#dimensionality,
                conversionTargetUnit.dimensionality,
            )
        ) {
            throw new Error(
                `Dimensionality mismatch: ${JSON.stringify(this.#dimensionality)} vs ${JSON.stringify(conversionTargetUnit.dimensionality)}`,
            );
        }
        this.#baseConversionFactor =
            conversionFactor *
            (conversionTargetUnit?.baseConversionFactor ?? 1);
        this.#symbol = symbol;
    }

    get dimensionality(): Dimensionality {
        return this.#dimensionality;
    }
    get baseConversionFactor(): number {
        return this.#baseConversionFactor;
    }
    get symbol(): string {
        return this.#symbol;
    }
    toString(): string {
        return this.#symbol;
    }
}

function defineUnit(builder: UnitBuilder): Unit {
    return new SimpleUnitImpl(builder);
}

export { type Unit, defineUnit };
