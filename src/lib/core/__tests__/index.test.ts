import * as core from '../';
import { describe, it } from 'vitest';
import { expectExportsExactly } from '../../../__tests__/utils';

describe('core', () => {
    it('should export all expected members', () => {
        expectExportsExactly(core, ['Scalar', 'BaseScalar']);
    });
});
