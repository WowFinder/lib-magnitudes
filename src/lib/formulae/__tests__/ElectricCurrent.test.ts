import {
    ElectricCharge,
    ElectricChargeUnit,
    ElectricCurrentUnit,
    Power,
    PowerUnit,
    Time,
    TimeUnit,
    Voltage,
    VoltageUnit,
} from '../../Magnitude';
import { electricChargePerTime, powerPerVoltage } from '../ElectricCurrent';
import { describe, expect, it } from 'vitest';

describe('ElectricCurrent formulae', () => {
    describe('electricChargePerTime', () => {
        it('should calculate electric current correctly for values in SI units', () => {
            const charge = new ElectricCharge({
                value: 10,
                unit: ElectricChargeUnit.C,
            });
            const time = new Time({ value: 2, unit: TimeUnit.s });
            const current = electricChargePerTime(charge, time);
            expect(current).toBeDefined();
            expect(current.value).toBe(5);
            expect(current.unit).toBe(ElectricCurrentUnit.A);
        });
        it('should calculate electric current correctly for values in other units', () => {
            const charge = new ElectricCharge({
                value: 20,
                unit: ElectricChargeUnit.Ah,
            });
            const time = new Time({ value: 15, unit: TimeUnit.m });
            const current = electricChargePerTime(charge, time);
            expect(current).toBeDefined();
            expect(current.value).toBe(80);
            expect(current.unit).toBe(ElectricCurrentUnit.A);
        });
        it('should throw if time is zero', () => {
            const charge = new ElectricCharge({
                value: 10,
                unit: ElectricChargeUnit.C,
            });
            const time = new Time({ value: 0, unit: TimeUnit.s });
            expect(() => electricChargePerTime(charge, time)).toThrow(
                /^Time cannot be zero/,
            );
        });
    });

    describe('powerPerVoltage', () => {
        it('should calculate electric current correctly for values in SI units', () => {
            const power = new Power({
                value: 10,
                unit: PowerUnit.W,
            });
            const voltage = new Voltage({ value: 2, unit: VoltageUnit.V });
            const current = powerPerVoltage(power, voltage);
            expect(current).toBeDefined();
            expect(current.value).toBe(5);
            expect(current.unit).toBe(ElectricCurrentUnit.A);
        });
        it('should throw if voltage is zero', () => {
            const power = new Power({
                value: 10,
                unit: PowerUnit.W,
            });
            const voltage = new Voltage({ value: 0, unit: VoltageUnit.V });
            expect(() => powerPerVoltage(power, voltage)).toThrow(
                /^Voltage cannot be zero/,
            );
        });
    });
});
