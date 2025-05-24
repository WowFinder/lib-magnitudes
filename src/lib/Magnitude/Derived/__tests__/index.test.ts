import * as Derived from '../';
import { describe, it } from 'vitest';
import { expectExportsExactly } from '../../../../__tests__/utils';

describe('Derived Magnitudes', () => {
    it('should export all expected members', () => {
        expectExportsExactly(Derived, [
            'ElectricCharge',
            'ElectricChargeUnit',
            'electricChargeConversionFactors',
            'Energy',
            'EnergyUnit',
            'energyConversionFactors',
            'Power',
            'PowerUnit',
            'powerConversionFactors',
            'Voltage',
            'VoltageUnit',
            'voltageConversionFactors',
        ]);
    });
});
