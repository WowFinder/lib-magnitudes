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
            // From Capacitance.ts
            'Capacitance',
            'CapacitanceUnit',
            'capacitanceConversionFactors',
            // From ElectricCharge.ts
            'ElectricCharge',
            'ElectricChargeUnit',
            'electricChargeConversionFactors',
            // From ElectricResistance.ts
            'ElectricResistance',
            'ElectricResistanceUnit',
            'electricResistanceConversionFactors',
            // From Energy.ts
            'Energy',
            'EnergyUnit',
            'energyConversionFactors',
            // From Force.ts
            'ScalarForce',
            'Force',
            'ForceUnit',
            'forceConversionFactors',
            // From Frequency.ts
            'Frequency',
            'FrequencyUnit',
            'frequencyConversionFactors',
            // From PlaneAngle.ts
            'PlaneAngle',
            'PlaneAngleUnit',
            'planeAngleConversionFactors',
            // From Power.ts
            'Power',
            'PowerUnit',
            'powerConversionFactors',
            // From Surface.ts
            'Area',
            'AreaUnit',
            'Surface',
            'areaUnitConversionFactors',
            'assertIsAreaUnitKey',
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
            // From Volume.ts
            'Volume',
            'VolumeUnit',
            'volumeUnitConversionFactors',
            'assertIsVolumeUnitKey',
        ]);
    });
});
