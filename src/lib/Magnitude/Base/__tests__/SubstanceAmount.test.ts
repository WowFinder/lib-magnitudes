import { fillDimensionality } from '../../../core';
import { SubstanceAmountUnit, SubstanceAmount } from '../SubstanceAmount';
import { describe, expect, it } from 'vitest';

describe('SubstanceAmount', () => {
    it('should have the correct dimensions', () => {
        expect(SubstanceAmount.dimensions).toEqual(
            fillDimensionality({ N: 1 }),
        );
    });

    it('should construct a SubstanceAmount instance with standard units', () => {
        const amount = new SubstanceAmount({
            value: 1,
            unit: SubstanceAmountUnit.mol,
        });
        expect(amount).toBeInstanceOf(SubstanceAmount);
        expect(amount.value).toBe(1);
        expect(amount.unit).toBe('mol');
    });

    it('should convert between substance amount units', () => {
        const amountInMoles = new SubstanceAmount({
            value: 1,
            unit: SubstanceAmountUnit.mol,
        });

        const convertedAmount = amountInMoles.convert(SubstanceAmountUnit.mol);
        expect(convertedAmount.value).toBe(1);
        expect(convertedAmount.unit).toBe('mol');
    });
});
