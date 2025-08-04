function kelvinToCelsius(k: number): number {
    return k - 273.15;
}
function celsiusToKelvin(c: number): number {
    return c + 273.15;
}
function kelvinToFahrenheit(k: number): number {
    return ((k - 273.15) * 9) / 5 + 32;
}
function fahrenheitToKelvin(f: number): number {
    return ((f - 32) * 5) / 9 + 273.15;
}

export {
    kelvinToCelsius,
    celsiusToKelvin,
    kelvinToFahrenheit,
    fahrenheitToKelvin,
};
