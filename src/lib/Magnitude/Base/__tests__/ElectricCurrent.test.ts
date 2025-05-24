import { ElectricCurrentUnit, ElectricCurrent } from '../ElectricCurrent';
import { describe, expect, it } from 'vitest';

describe('ElectricCurrent', () => {
    it('should construct an ElectricCurrent instance with standard units', () => {
        const current = new ElectricCurrent({
            value: 1,
            unit: ElectricCurrentUnit.A,
        });
        expect(current.value).toBe(1);
        expect(current.unit).toBe('A');
    });

    it('should convert between electric current units', () => {
        const currentInAmperes = new ElectricCurrent({
            value: 1,
            unit: ElectricCurrentUnit.A,
        });

        const convertedCurrent = currentInAmperes.convert(
            ElectricCurrentUnit.A,
        );
        expect(convertedCurrent.value).toBe(1);
        expect(convertedCurrent.unit).toBe('A');
    });
});
