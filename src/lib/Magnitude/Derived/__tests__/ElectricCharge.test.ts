import { fillDimensionality } from '../../../core';
import { ElectricChargeUnit, ElectricCharge } from '../ElectricCharge';
import { describe, expect, it } from 'vitest';

describe('ElectricCharge', () => {
    it('should have the correct dimensions', () => {
        expect(ElectricCharge.dimensions).toEqual(
            fillDimensionality({ T: 1, I: 1 }),
        );
    });
    it('should construct an ElectricCharge instance with standard units', () => {
        const charge = new ElectricCharge({
            value: 1,
            unit: ElectricChargeUnit.C,
        });
        expect(charge.value).toBe(1);
        expect(charge.unit).toBe('C');
    });

    it('should construct an ElectricCharge instance with other units', () => {
        const charge = new ElectricCharge({
            value: 1,
            unit: ElectricChargeUnit.As,
        });
        expect(charge.value).toBe(1);
        expect(charge.unit).toBe('As');
    });

    it('should convert between different electric charge units', () => {
        const chargeInCoulombs = new ElectricCharge({
            value: 1,
            unit: ElectricChargeUnit.C,
        });

        const chargeInAs = chargeInCoulombs.convert(ElectricChargeUnit.As);
        expect(chargeInAs.value).toBe(1);
        expect(chargeInAs.unit).toBe('As');

        const chargeInAh = chargeInCoulombs.convert(ElectricChargeUnit.Ah);
        expect(chargeInAh.value).toBeCloseTo(0.0002777777777777778, 10);
        expect(chargeInAh.unit).toBe('Ah');
    });
});
