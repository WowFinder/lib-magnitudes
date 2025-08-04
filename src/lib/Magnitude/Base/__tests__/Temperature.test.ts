import { fillDimensionality } from '../../../core';
import { TemperatureUnit, Temperature } from '../Temperature';
import { describe, expect, it } from 'vitest';

describe('Temperature', () => {
    function simpleTemperature(): Temperature {
        return new Temperature({ value: 100, unit: TemperatureUnit.K });
    }

    it('should have the correct dimensions', () => {
        expect(Temperature.dimensions).toEqual(fillDimensionality({ Θ: 1 }));
    });

    it('should create a Temperature instance', () => {
        const temp = simpleTemperature();
        expect(temp).toBeInstanceOf(Temperature);
        expect(temp.value).toBe(100);
        expect(temp.unit).toBe('K');
    });

    it('should convert between standard units', () => {
        const temp = simpleTemperature().convert(TemperatureUnit.K);
        expect(temp.value).toBe(100);
        expect(temp.unit).toBe('K');
    });

    it('should create a temperature instance from a Celsius value', () => {
        const temp = Temperature.fromCelsius(100);
        expect(temp).toBeInstanceOf(Temperature);
        expect(temp.unit).toBe('K');
        expect(temp.value).toBeCloseTo(373.15);
        expect(temp.asCelsius).toBeCloseTo(100);
    });

    it('should create a temperature instance from a Fahrenheit value', () => {
        const temp = Temperature.fromFahrenheit(212);
        expect(temp).toBeInstanceOf(Temperature);
        expect(temp.unit).toBe('K');
        expect(temp.value).toBeCloseTo(373.15);
        expect(temp.asFahrenheit).toBeCloseTo(212);
    });
});
