import * as core from '../';
import { describe, it } from 'vitest';
import { expectExportsExactly } from '../../../__tests__/utils';

describe('core', () => {
    it('should export all expected members', () => {
        expectExportsExactly(core, [
            // from Conversion.ts
            'makeConversions',
            'add',

            // from Dimensionality.ts
            'fillDimensionality',
            'matchDimensionalities',
            'matchPartialDimensionalities',
            'productDimensionality',
            'inverseDimensionality',
            'dimensionalityRatio',

            // From Prefix.ts
            'UnitPrefixes',
            'prefixMatchers',
            'prefixSymbols',
            'prefixBySymbol',
            'bestPrefixByValue',

            // From Scalar.ts
            'Scalar',
            'BaseScalar',

            // From Unit.ts
            'defineUnit',
        ]);
    });
});
