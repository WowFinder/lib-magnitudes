import * as math from '../';
import { describe, it } from 'vitest';
import { expectExportsExactly } from '../../../__tests__/utils';

describe('math index', () => {
    it('should export all expected members', () => {
        expectExportsExactly(math, [
            // From ElectricCurrent.ts
            'electricChargePerTime',
            'powerPerVoltage',
            // From Energy.ts
            'powerTimesTime',
            'timeTimesPower',
            'forceTimesDistance',
            'distanceTimesForce',
            // From Power.ts
            'energyPerTime',
            'electricCurrentTimesVoltage',
            'voltageTimesElectricCurrent',
            // From Voltage.ts
            'powerPerElectricCurrent',
        ]);
    });
});
