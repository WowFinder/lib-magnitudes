import * as core from '../';
import { describe, it } from 'vitest';
import { expectExportsExactly } from '../../../__tests__/utils';

describe('core', () => {
    it('should export all expected members', () => {
        expectExportsExactly(core, [
            // from Conversion.ts
            'makeScalarConversions',
            'makeVectorConversions',
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
            'BaseScalar',
            'Scalar',

            // From Unit.ts
            'defineUnit',

            // From Vector3D.ts
            'BaseVector3D',
            'Vector3D',
        ]);
    });
});
