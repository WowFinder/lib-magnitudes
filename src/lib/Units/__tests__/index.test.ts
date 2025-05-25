import * as Units from '../';
import { describe, it } from 'vitest';
import { expectExportsExactly } from '../../../__tests__/utils';

describe('Units index', () => {
    it('should export all expected members', () => {
        expectExportsExactly(Units, [
            'fillDimensionality',
            'matchDimensionalities',
            'matchPartialDimensionalities',
            'productDimensionality',
            'inverseDimensionality',
            'dimensionalityRatio',
            'UnitPrefixes',
            'prefixMatchers',
            'prefixSymbols',
            'prefixBySymbol',
            'bestPrefixByValue',
            'defineUnit',
        ]);
    });
});
