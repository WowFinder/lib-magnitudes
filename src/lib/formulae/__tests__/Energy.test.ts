import { EnergyUnit, Power, PowerUnit, Time, TimeUnit } from '../../Magnitude';
import { powerTimesTime, timeTimesPower } from '../Energy';
import { describe, expect, it } from 'vitest';

describe('Energy formulae', () => {
    describe('powerTimesTime', () => {
        it('should calculate energy correctly for values in SI units', () => {
            const power = new Power({ value: 10, unit: PowerUnit.W });
            const time = new Time({ value: 2, unit: TimeUnit.s });
            const energy = powerTimesTime(power, time);
            expect(energy).toBeDefined();
            expect(energy.value).toBe(20);
            expect(energy.unit).toBe(EnergyUnit.J);
            const energy2 = timeTimesPower(time, power);
            expect(energy2).toBeDefined();
            expect(energy2.value).toBe(20);
            expect(energy2.unit).toBe(EnergyUnit.J);
        });

        it('should calculate energy correctly for values in other units', () => {
            const power = new Power({ value: 200, unit: PowerUnit.W });
            const time = new Time({ value: 15, unit: TimeUnit.m });
            const energy = powerTimesTime(power, time);
            expect(energy).toBeDefined();
            expect(energy.value).toBeCloseTo(180000, 6); // 200 W * (15 min * 60 s/min) = 180000 J
            expect(energy.unit).toBe(EnergyUnit.J);
            const energy2 = timeTimesPower(time, power);
            expect(energy2).toBeDefined();
            expect(energy2.value).toBeCloseTo(180000, 6);
            expect(energy2.unit).toBe(EnergyUnit.J);
        });
    });
});
