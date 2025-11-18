import * as math from '../';
import { describe, it } from 'vitest';
import { expectExportsExactly } from '../../../__tests__/utils';

describe('math index', () => {
    it('should export all expected members', () => {
        expectExportsExactly(math, [
            // From Acceleration.ts
            'speedPerTime',
            // From Capacitance.ts
            'electricChargePerVoltage',
            // From ElectricCurrent.ts
            'electricChargePerTime',
            'powerPerVoltage',
            // From ElectricResistance.ts
            'voltagePerCurrent',
            // From Energy.ts
            'powerTimesTime',
            'timeTimesPower',
            'forceTimesDistance',
            'distanceTimesForce',
            'kineticEnergy',
            'capacitorEnergy',
            // From Frequency.ts
            'frequencyFromTime',
            // From Power.ts
            'energyPerTime',
            'electricCurrentTimesVoltage',
            'voltageTimesElectricCurrent',
            // From Speed.ts
            'distancePerTime',
            // From Time.ts
            'periodFromFrequency',
            // From Voltage.ts
            'powerPerElectricCurrent',
        ]);
    });
});
