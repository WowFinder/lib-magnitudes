import {
    ElectricCurrent,
    ElectricCurrentUnit,
    Energy,
    EnergyUnit,
    PowerUnit,
    Voltage,
    VoltageUnit,
    Time,
    TimeUnit,
} from '../../Magnitude';
import {
    energyPerTime,
    electricCurrentTimesVoltage,
    voltageTimesElectricCurrent,
} from '../Power';
import { describe, expect, it } from 'vitest';

describe('Power formulae', () => {
    describe('energyPerTime', () => {
        it('should calculate power correctly for values in SI units', () => {
            const energy = new Energy({ value: 10, unit: EnergyUnit.J });
            const time = new Time({ value: 2, unit: TimeUnit.s });
            const power = energyPerTime(energy, time);
            expect(power).toBeDefined();
            expect(power.value).toBe(5);
            expect(power.unit).toBe(PowerUnit.W);
        });

        it('should calculate power correctly for values in other units', () => {
            const energy = new Energy({ value: 200, unit: EnergyUnit.J });
            const time = new Time({ value: 15, unit: TimeUnit.m });
            const power = energyPerTime(energy, time);
            expect(power).toBeDefined();
            expect(power.value).toBeCloseTo(0.222222, 6); // 200 J / (15 min * 60 s/min) = 0.222222 W
            expect(power.unit).toBe(PowerUnit.W);
        });

        it('should throw if time is zero', () => {
            const energy = new Energy({ value: 10, unit: EnergyUnit.J });
            const time = new Time({ value: 0, unit: TimeUnit.s });
            expect(() => energyPerTime(energy, time)).toThrow(
                /^Time cannot be zero/,
            );
        });
    });

    describe('electricCurrentTimesVoltage', () => {
        it('should calculate power correctly for values in SI units', () => {
            const current = new ElectricCurrent({
                value: 10,
                unit: ElectricCurrentUnit.A,
            });
            const voltage = new Voltage({ value: 2, unit: VoltageUnit.V });
            const power = electricCurrentTimesVoltage(current, voltage);
            expect(power).toBeDefined();
            expect(power.value).toBe(20);
            expect(power.unit).toBe(PowerUnit.W);
            const power2 = voltageTimesElectricCurrent(voltage, current);
            expect(power2).toBeDefined();
            expect(power2.value).toBe(20);
            expect(power2.unit).toBe(PowerUnit.W);
        });
        it('should handle zero current or voltage', () => {
            const current = new ElectricCurrent({
                value: 0,
                unit: ElectricCurrentUnit.A,
            });
            const voltage = new Voltage({ value: 5, unit: VoltageUnit.V });
            const power = electricCurrentTimesVoltage(current, voltage);
            expect(power).toBeDefined();
            expect(power.value).toBe(0);
            expect(power.unit).toBe(PowerUnit.W);

            const voltageZero = new Voltage({ value: 0, unit: VoltageUnit.V });
            const powerZero = electricCurrentTimesVoltage(current, voltageZero);
            expect(powerZero).toBeDefined();
            expect(powerZero.value).toBe(0);
            expect(powerZero.unit).toBe(PowerUnit.W);
        });
        it('should handle zero voltage with non-zero current', () => {
            const current = new ElectricCurrent({
                value: 10,
                unit: ElectricCurrentUnit.A,
            });
            const voltageZero = new Voltage({ value: 0, unit: VoltageUnit.V });
            const power = electricCurrentTimesVoltage(current, voltageZero);
            expect(power).toBeDefined();
            expect(power.value).toBe(0);
            expect(power.unit).toBe(PowerUnit.W);
        });
        it('should handle zero current with non-zero voltage', () => {
            const currentZero = new ElectricCurrent({
                value: 0,
                unit: ElectricCurrentUnit.A,
            });
            const voltage = new Voltage({ value: 5, unit: VoltageUnit.V });
            const power = electricCurrentTimesVoltage(currentZero, voltage);
            expect(power).toBeDefined();
            expect(power.value).toBe(0);
            expect(power.unit).toBe(PowerUnit.W);
        });
    });
});
