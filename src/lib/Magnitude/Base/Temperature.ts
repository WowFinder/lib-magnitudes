import {
    type ScalarConversion,
    type ConversionFactors,
    makeScalarConversions,
    Scalar,
    type ScalarBuilder,
    type Dimensionality,
    fillDimensionality,
} from '../../core';
import {
    celsiusToKelvin,
    fahrenheitToKelvin,
    kelvinToCelsius,
    kelvinToFahrenheit,
} from './Temperature.conversions';

const TemperatureUnit = {
    // Note: ℃ and ℉ handled separately due to offset zeroes
    K: 'K',
} as const;
Object.freeze(TemperatureUnit);

const temperatureConversionFactors: ConversionFactors<typeof TemperatureUnit> =
    {
        K: 1,
    } as const;
Object.freeze(temperatureConversionFactors);

class Temperature extends Scalar<typeof TemperatureUnit> {
    static #converter: ScalarConversion<typeof TemperatureUnit, Temperature>;
    constructor({ value, unit }: ScalarBuilder<typeof TemperatureUnit>) {
        super({ value, unit });
    }

    static {
        Temperature.#converter = makeScalarConversions<
            typeof TemperatureUnit,
            Temperature
        >(
            temperatureConversionFactors,
            ({ value, unit }) => new Temperature({ value, unit }),
        );
    }

    static fromCelsius(value: number): Temperature {
        return new Temperature({
            value: celsiusToKelvin(value),
            unit: TemperatureUnit.K,
        });
    }

    static fromFahrenheit(value: number): Temperature {
        return new Temperature({
            value: fahrenheitToKelvin(value),
            unit: TemperatureUnit.K,
        });
    }

    static get dimensions(): Dimensionality {
        return fillDimensionality({ Θ: 1 });
    }

    convert(unit: keyof typeof TemperatureUnit): Temperature {
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment
        return Temperature.#converter(this, unit);
    }

    get asCelsius(): number {
        return kelvinToCelsius(this.convert(TemperatureUnit.K).value);
    }

    get asFahrenheit(): number {
        return kelvinToFahrenheit(this.convert(TemperatureUnit.K).value);
    }
}

export { TemperatureUnit, Temperature, temperatureConversionFactors };
