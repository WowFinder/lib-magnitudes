import * as lib from '../';
import { describe, it } from 'vitest';
import { expectExportsAtLeast } from '../../__tests__/utils';

describe('lib index', () => {
    it('should export all expected members', () => {
        expectExportsAtLeast(lib, [
            'Scalar',
            'fillDimensionality',
            'prefixMatchers',
            'makeConversions',
            'Time',
        ]);
    });
});
