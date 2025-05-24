import * as Base from '../';
import { describe, it } from 'vitest';
import { expectExportsExactly } from '../../../../__tests__/utils';

describe('Base Magnitudes', () => {
    it('should export all expected members', () => {
        expectExportsExactly(Base, [
            'Length',
            'LengthUnit',
            'lengthConversionFactors',
            'Mass',
            'MassUnit',
            'massConversionFactors',
            'Time',
            'TimeUnit',
            'timeConversionFactors',
        ]);
    });
});
