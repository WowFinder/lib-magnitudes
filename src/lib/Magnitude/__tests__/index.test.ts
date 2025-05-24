import * as Magnitudes from '../';
import { describe, it } from 'vitest';
import { expectExportsAtLeast } from '../../../__tests__/utils';

describe('Magnitudes', () => {
    it('should export essential members from Base', () => {
        expectExportsAtLeast(Magnitudes, ['Time']);
    });
});
