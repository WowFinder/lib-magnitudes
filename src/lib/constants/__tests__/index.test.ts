import * as constants from '../';
import { describe, it } from 'vitest';
import { expectExportsExactly } from '../../../__tests__/utils';

describe('constants', () => {
    it('should export all constants correctly', () => {
        expectExportsExactly(constants, ['g_0', 'e', 'c']);
    });
});
