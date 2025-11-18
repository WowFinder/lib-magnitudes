import {
    type ScalarConversion,
    type ConversionFactors,
    makeScalarConversions,
    Scalar,
    type ScalarBuilder,
    type Dimensionality,
    fillDimensionality,
} from '../../core';

const PlaneAngleUnit = {
    rad: 'rad',
    deg: 'deg',
    rev: 'rev',
} as const;
Object.freeze(PlaneAngleUnit);

const planeAngleConversionFactors: ConversionFactors<typeof PlaneAngleUnit> = {
    rad: 1,
    deg: Math.PI / 180,
    rev: 2 * Math.PI,
} as const;
Object.freeze(planeAngleConversionFactors);

class PlaneAngle extends Scalar<typeof PlaneAngleUnit> {
    static #converter: ScalarConversion<typeof PlaneAngleUnit, PlaneAngle>;
    constructor({ value, unit }: ScalarBuilder<typeof PlaneAngleUnit>) {
        super({ value, unit });
    }
    static {
        PlaneAngle.#converter = makeScalarConversions<
            typeof PlaneAngleUnit,
            PlaneAngle
        >(
            planeAngleConversionFactors,
            ({ value, unit }) =>
                new PlaneAngle({
                    value,
                    unit: unit,
                }),
        );
    }

    static get dimensions(): Dimensionality {
        return fillDimensionality({ α: 1 });
    }

    convert(unit: keyof typeof PlaneAngleUnit): PlaneAngle {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return PlaneAngle.#converter(this, unit);
    }
}

export { PlaneAngleUnit, PlaneAngle, planeAngleConversionFactors };
