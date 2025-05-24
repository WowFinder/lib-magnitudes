type Dimensionality = {
    readonly L: number;
    readonly M: number;
    readonly T: number;
    readonly α: number;
    readonly mol: number;
};

type DimensionalityBuilder = Readonly<Partial<Dimensionality>>;

function fillDimensionality(
    dimensionality: DimensionalityBuilder,
): Dimensionality {
    return {
        L: dimensionality.L ?? 0,
        M: dimensionality.M ?? 0,
        T: dimensionality.T ?? 0,
        α: dimensionality.α ?? 0,
        mol: dimensionality.mol ?? 0,
    } as const;
}

function matchDimensionality(a: Dimensionality, b: Dimensionality): boolean {
    return (
        a.L === b.L &&
        a.M === b.M &&
        a.T === b.T &&
        a.α === b.α &&
        a.mol === b.mol
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

export {
    type Dimensionality,
    type DimensionalityBuilder,
    fillDimensionality,
    matchDimensionalities,
    matchPartialDimensionalities,
};
