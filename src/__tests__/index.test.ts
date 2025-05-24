import * as main from '../';
import { describe, it } from 'vitest';
import { expectExportsAtLeast } from './utils';

describe('main index', () => {
    it('should export members from core', () => {
        expectExportsAtLeast(main, [
            'Scalar',
            'fillDimensionality',
            'prefixMatchers',
            'makeConversions',
        ]);
    });
});
