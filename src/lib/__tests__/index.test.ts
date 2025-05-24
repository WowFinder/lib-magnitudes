import * as lib from '../';
import { describe, it } from 'vitest';
import { expectExportsExactly } from '../../__tests__/utils';

describe('lib index', () => {
    it('should export all expected members', () => {
        expectExportsExactly(lib, [
            'Scalar',
            'BaseScalar',
            'fillDimensionality',
            'matchDimensionalities',
            'matchPartialDimensionalities',
            'UnitPrefixes',
            'prefixMatchers',
            'prefixSymbols',
            'prefixBySymbol',
            'bestPrefixByValue',
            'defineUnit',
        ]);
    });
});
