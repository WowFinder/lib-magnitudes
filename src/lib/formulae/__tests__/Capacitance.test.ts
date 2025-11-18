import {
    CapacitanceUnit,
    Voltage,
    VoltageUnit,
    ElectricCharge,
    ElectricChargeUnit,
} from '../../Magnitude';
import { electricChargePerVoltage } from '../Capacitance';
import { describe, expect, it } from 'vitest';

describe('Capacitance formulae', () => {
    describe('electricChargePerVoltage', () => {
        it('should calculate capacitance correctly for values in SI units', () => {
            const charge = new ElectricCharge({
                value: 10,
                unit: ElectricChargeUnit.C,
            });
            const voltage = new Voltage({
                value: 5,
                unit: VoltageUnit.V,
            });
            const capacitance = electricChargePerVoltage(charge, voltage);
            expect(capacitance).toBeDefined();
            expect(capacitance.value).toBe(2);
            expect(capacitance.unit).toBe(CapacitanceUnit.F);
        });

        it('should throw if voltage is zero', () => {
            const charge = new ElectricCharge({
                value: 10,
                unit: ElectricChargeUnit.C,
            });
            const voltage = new Voltage({
                value: 0,
                unit: VoltageUnit.V,
            });
            expect(() => electricChargePerVoltage(charge, voltage)).toThrow(
                /^Voltage cannot be zero/,
            );
        });
    });
});
