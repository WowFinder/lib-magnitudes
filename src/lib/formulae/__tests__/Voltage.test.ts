import {
    ElectricCurrent,
    ElectricCurrentUnit,
    Power,
    PowerUnit,
    VoltageUnit,
} from '../../Magnitude';
import { powerPerElectricCurrent } from '../Voltage';
import { describe, expect, it } from 'vitest';

describe('Voltage formulae', () => {
    describe('powerPerElectricCurrent', () => {
        it('should calculate voltage correctly for values in SI units', () => {
            const power = new Power({
                value: 10,
                unit: PowerUnit.W,
            });
            const current = new ElectricCurrent({
                value: 2,
                unit: ElectricCurrentUnit.A,
            });
            const voltage = powerPerElectricCurrent(power, current);
            expect(voltage).toBeDefined();
            expect(voltage.value).toBe(5);
            expect(voltage.unit).toBe(VoltageUnit.V);
        });

        it('should throw if electric current is zero', () => {
            const power = new Power({
                value: 10,
                unit: PowerUnit.W,
            });
            const current = new ElectricCurrent({
                value: 0,
                unit: ElectricCurrentUnit.A,
            });
            expect(() => powerPerElectricCurrent(power, current)).toThrow(
                /^Electric current cannot be zero/,
            );
        });
    });
});
