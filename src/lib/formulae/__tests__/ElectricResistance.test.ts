import {
    Voltage,
    VoltageUnit,
    ElectricCurrent,
    ElectricCurrentUnit,
    ElectricResistanceUnit,
} from '../../Magnitude';
import { voltagePerCurrent } from '../ElectricResistance';
import { describe, expect, it } from 'vitest';

describe('ElectricResistance formulae', () => {
    describe('voltagePerCurrent', () => {
        it('should calculate resistance correctly for values in SI units', () => {
            const voltage = new Voltage({
                value: 10,
                unit: VoltageUnit.V,
            });
            const current = new ElectricCurrent({
                value: 2,
                unit: ElectricCurrentUnit.A,
            });
            const resistance = voltagePerCurrent(voltage, current);
            expect(resistance).toBeDefined();
            expect(resistance.value).toBe(5);
            expect(resistance.unit).toBe(ElectricResistanceUnit.Ω);
        });

        it('should throw if current is zero', () => {
            const voltage = new Voltage({
                value: 10,
                unit: VoltageUnit.V,
            });
            const current = new ElectricCurrent({
                value: 0,
                unit: ElectricCurrentUnit.A,
            });
            expect(() => voltagePerCurrent(voltage, current)).toThrow(
                /^Electric current cannot be zero/,
            );
        });
    });
});
