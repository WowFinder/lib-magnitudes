import * as Derived from '../';
import { describe, it } from 'vitest';
import { expectExportsExactly } from '../../../../__tests__/utils';

describe('Derived Magnitudes', () => {
    it('should export all expected members', () => {
        expectExportsExactly(Derived, [
            'Acceleration',
            'ElectricCharge',
            'ElectricChargeUnit',
            'electricChargeConversionFactors',
            'Energy',
            'EnergyUnit',
            'energyConversionFactors',
            'Power',
            'PowerUnit',
            'powerConversionFactors',
            'ScalarAcceleration',
            'AccelerationUnit',
            'accelerationUnitConversionFactors',
            'assertIsAccelerationUnitKey',
            'Speed',
            'SpeedUnit',
            'speedUnitConversionFactors',
            'assertIsSpeedUnitKey',
            'Velocity',
            'Voltage',
            'VoltageUnit',
            'voltageConversionFactors',
        ]);
    });
});
