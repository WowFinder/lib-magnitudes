import * as Derived from '../';
import { describe, it } from 'vitest';
import { expectExportsExactly } from '../../../../__tests__/utils';

describe('Derived Magnitudes', () => {
    it('should export all expected members', () => {
        expectExportsExactly(Derived, [
            // From Acceleration.ts
            'ScalarAcceleration',
            'Acceleration',
            'AccelerationUnit',
            'accelerationUnitConversionFactors',
            'assertIsAccelerationUnitKey',
            // From ElectricCharge.ts
            'ElectricCharge',
            'ElectricChargeUnit',
            'electricChargeConversionFactors',
            // From Energy.ts
            'Energy',
            'EnergyUnit',
            'energyConversionFactors',
            // From Force.ts
            'ScalarForce',
            'Force',
            'ForceUnit',
            'forceConversionFactors',
            // From Power.ts
            'Power',
            'PowerUnit',
            'powerConversionFactors',
            // From Velocity.ts
            'Speed',
            'Velocity',
            'SpeedUnit',
            'speedUnitConversionFactors',
            'assertIsSpeedUnitKey',
            // From Voltage.ts
            'Voltage',
            'VoltageUnit',
            'voltageConversionFactors',
        ]);
    });
});
