import * as main from '../';
import { describe, it } from 'vitest';
import { expectExportsExactly } from './utils';

describe('main index', () => {
    it('should export all expected members', () => {
        expectExportsExactly(main, [
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
            'makeConversions',
            'add',
        ]);
    });
});
