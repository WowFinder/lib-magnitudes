import {
    EnergyUnit,
    Force,
    ForceUnit,
    Length,
    LengthUnit,
    Position,
    Power,
    PowerUnit,
    ScalarForce,
    Time,
    TimeUnit,
} from '../../Magnitude';
import {
    powerTimesTime,
    timeTimesPower,
    forceTimesDistance,
    distanceTimesForce,
} from '../Energy';
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
    describe('forceTimesDistance', () => {
        it('should calculate energy correctly for scalar force and length in SI units', () => {
            const distance = new Length({ value: 2, unit: LengthUnit.m });
            const force = new ScalarForce({ value: 10, unit: ForceUnit.N });
            const energy = forceTimesDistance(force, distance);
            expect(energy).toBeDefined();
            expect(energy.value).toBe(20);
            expect(energy.unit).toBe(EnergyUnit.J);
            const energy2 = distanceTimesForce(distance, force);
            expect(energy2).toBeDefined();
            expect(energy2.value).toBe(20);
            expect(energy2.unit).toBe(EnergyUnit.J);
        });
        it('should calculate energy correctly for scalar force and length in other units', () => {
            // 5 miles = 5 * 1609.344 m = 8046.72 m
            const distance = new Length({ value: 5, unit: LengthUnit.mile });
            // 100 lbf = 100 * 4.4482216152604997 N = 444.82216152604997 N
            const force = new ScalarForce({ value: 100, unit: ForceUnit.lbf });
            const energy = forceTimesDistance(force, distance);
            expect(energy).toBeDefined();
            // 444.82216152604997 N * 8046.72 m ≃ 3579359.383594897 J
            expect(energy.value).toBeCloseTo(3579359.383594897, 8);
            expect(energy.unit).toBe(EnergyUnit.J);
            const energy2 = distanceTimesForce(distance, force);
            expect(energy2).toBeDefined();
            expect(energy2.value).toBeCloseTo(3579359.383594897, 8);
            expect(energy2.unit).toBe(EnergyUnit.J);
        });
        it('should calculate energy correctly for scalar force and position / displacement vector', () => {
            const distance = new Position({
                x: 3,
                y: 4,
                z: 0,
                unit: LengthUnit.m,
            });
            const force = new ScalarForce({ value: 10, unit: ForceUnit.N });
            const energy = forceTimesDistance(force, distance);
            expect(energy).toBeDefined();
            expect(energy.value).toBe(50);
            expect(energy.unit).toBe(EnergyUnit.J);
            const energy2 = distanceTimesForce(distance, force);
            expect(energy2).toBeDefined();
            expect(energy2.value).toBe(50);
            expect(energy2.unit).toBe(EnergyUnit.J);
        });
        it('should calculate energy correctly for force vector and scalar length', () => {
            const distance = new Length({ value: 2, unit: LengthUnit.m });
            const force = new Force({ x: 0, y: 6, z: 8, unit: ForceUnit.N });
            const energy = forceTimesDistance(force, distance);
            expect(energy).toBeDefined();
            expect(energy.value).toBe(20);
            expect(energy.unit).toBe(EnergyUnit.J);
            const energy2 = distanceTimesForce(distance, force);
            expect(energy2).toBeDefined();
            expect(energy2.value).toBe(20);
            expect(energy2.unit).toBe(EnergyUnit.J);
        });
        describe('work as dot product of vectors (angle dependant)', () => {
            it('should calculate energy correctly for parallel force vector and position / displacement vector', () => {
                const distance = new Position({
                    x: 3,
                    y: 4,
                    z: 0,
                    unit: LengthUnit.m,
                });
                const force = new Force({
                    x: 6,
                    y: 8,
                    z: 0,
                    unit: ForceUnit.N,
                });
                const energy = forceTimesDistance(force, distance);
                expect(energy).toBeDefined();
                expect(energy.value).toBe(50);
                expect(energy.unit).toBe(EnergyUnit.J);
                const energy2 = distanceTimesForce(distance, force);
                expect(energy2).toBeDefined();
                expect(energy2.value).toBe(50);
                expect(energy2.unit).toBe(EnergyUnit.J);
            });
            it('should calculate energy correctly for perpendicular force vector and position / displacement vector', () => {
                const distance = new Position({
                    x: 3,
                    y: 4,
                    z: 0,
                    unit: LengthUnit.m,
                });
                const force = new Force({
                    x: -4,
                    y: 3,
                    z: 0,
                    unit: ForceUnit.N,
                });
                const energy = forceTimesDistance(force, distance);
                expect(energy).toBeDefined();
                expect(energy.value).toBe(0);
                expect(energy.unit).toBe(EnergyUnit.J);
                const energy2 = distanceTimesForce(distance, force);
                expect(energy2).toBeDefined();
                expect(energy2.value).toBe(0);
                expect(energy2.unit).toBe(EnergyUnit.J);
            });
            it('should calculate energy correctly for force vector and position / displacement vector at an angle', () => {
                const distance = new Position({
                    x: 3,
                    y: 4,
                    z: 0,
                    unit: LengthUnit.m,
                });
                const force = new Force({
                    x: 6,
                    y: 0,
                    z: -8,
                    unit: ForceUnit.N,
                });
                const energy = forceTimesDistance(force, distance);
                expect(energy).toBeDefined();
                expect(energy.value).toBe(18);
                expect(energy.unit).toBe(EnergyUnit.J);
                const energy2 = distanceTimesForce(distance, force);
                expect(energy2).toBeDefined();
                expect(energy2.value).toBe(18);
                expect(energy2.unit).toBe(EnergyUnit.J);
            });
        });
    });
});
