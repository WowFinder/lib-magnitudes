import * as Base from '../';
import { describe, it } from 'vitest';
import { expectExportsExactly } from '../../../../__tests__/utils';

describe('Base Magnitudes', () => {
    it('should export all expected members', () => {
        expectExportsExactly(Base, [
            'ElectricCurrent',
            'ElectricCurrentUnit',
            'electricCurrentConversionFactors',
            'Length',
            'LengthUnit',
            'lengthConversionFactors',
            'LuminousIntensity',
            'LuminousIntensityUnit',
            'luminousIntensityConversionFactors',
            'Mass',
            'MassUnit',
            'massConversionFactors',
            'Position',
            'Temperature',
            'TemperatureUnit',
            'temperatureConversionFactors',
            'SubstanceAmount',
            'SubstanceAmountUnit',
            'substanceAmountConversionFactors',
            'Time',
            'TimeUnit',
            'timeUnitConversionFactors',
        ]);
    });
});
