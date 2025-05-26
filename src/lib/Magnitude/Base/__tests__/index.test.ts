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
            'Mass',
            'MassUnit',
            'massConversionFactors',
            'Position',
            'Time',
            'TimeUnit',
            'timeUnitConversionFactors',
        ]);
    });
});
