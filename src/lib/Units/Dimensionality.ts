type Dimensionality = {
    readonly T: number;
    readonly L: number;
    readonly M: number;
    readonly I: number;
    readonly Θ: number;
    readonly N: number;
    readonly J: number;
    readonly α: number;
};

type DimensionalityBuilder = Readonly<Partial<Dimensionality>>;

function fillDimensionality(
    dimensionality: DimensionalityBuilder,
): Dimensionality {
    return {
        T: dimensionality.T ?? 0,
        L: dimensionality.L ?? 0,
        M: dimensionality.M ?? 0,
        I: dimensionality.I ?? 0,
        Θ: dimensionality.Θ ?? 0,
        N: dimensionality.N ?? 0,
        J: dimensionality.J ?? 0,
        α: dimensionality.α ?? 0,
    } as const;
}

function matchDimensionality(a: Dimensionality, b: Dimensionality): boolean {
    return (
        a.L === b.L &&
        a.M === b.M &&
        a.T === b.T &&
        a.I === b.I &&
        a.Θ === b.Θ &&
        a.N === b.N &&
        a.J === b.J &&
        a.α === b.α
    );
}

function matchDimensionalities(...dimensionalities: Dimensionality[]): boolean {
    if (dimensionalities.length === 0) {
        return true;
    }
    const firstDimensionality = dimensionalities[0];
    return dimensionalities.every(dimensionality =>
        matchDimensionality(firstDimensionality, dimensionality),
    );
}

function matchPartialDimensionalities(
    ...dimensionalities: Partial<Dimensionality>[]
): boolean {
    return matchDimensionalities(
        ...dimensionalities.map(dimensionality =>
            fillDimensionality(dimensionality),
        ),
    );
}

function sum(...values: number[]): number {
    return values.reduce((acc, value) => acc + value, 0);
}

function productDimensionality(
    ...dimensionalities: DimensionalityBuilder[]
): Dimensionality {
    return {
        T: sum(...dimensionalities.map(d => d?.T ?? 0)),
        L: sum(...dimensionalities.map(d => d?.L ?? 0)),
        M: sum(...dimensionalities.map(d => d?.M ?? 0)),
        I: sum(...dimensionalities.map(d => d?.I ?? 0)),
        Θ: sum(...dimensionalities.map(d => d?.Θ ?? 0)),
        N: sum(...dimensionalities.map(d => d?.N ?? 0)),
        J: sum(...dimensionalities.map(d => d?.J ?? 0)),
        α: sum(...dimensionalities.map(d => d?.α ?? 0)),
    } as const;
}

function inverseDimensionality(
    dimensionality: DimensionalityBuilder,
): Dimensionality {
    return {
        T: -1 * (dimensionality.T ?? 0),
        L: -1 * (dimensionality.L ?? 0),
        M: -1 * (dimensionality.M ?? 0),
        I: -1 * (dimensionality.I ?? 0),
        Θ: -1 * (dimensionality.Θ ?? 0),
        N: -1 * (dimensionality.N ?? 0),
        J: -1 * (dimensionality.J ?? 0),
        α: -1 * (dimensionality.α ?? 0),
    } as const;
}

function dimensionalityRatio(
    numerator: DimensionalityBuilder,
    denominator: DimensionalityBuilder,
): Dimensionality {
    return productDimensionality(numerator, inverseDimensionality(denominator));
}

export {
    type Dimensionality,
    type DimensionalityBuilder,
    fillDimensionality,
    matchDimensionalities,
    matchPartialDimensionalities,
    productDimensionality,
    inverseDimensionality,
    dimensionalityRatio,
};
