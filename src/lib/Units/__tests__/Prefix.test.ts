import { UnitPrefixes, prefixBySymbol, bestPrefixByValue } from '../Prefix';
import { describe, it, expect } from 'vitest';
const standardSiMultiples = [
    'k',
    'M',
    'G',
    'T',
    'P',
    'E',
    'Z',
    'Y',
    'R',
    'Q',
] as const;
const standardSiSubmultiples = [
    'm',
    'µ',
    'n',
    'p',
    'f',
    'a',
    'z',
    'y',
    'r',
    'q',
] as const;

describe('Prefix', () => {
    describe('UnitPrefixes', () => {
        it('should define all the standard SI prefixes', () => {
            const expectedPrefixes = [
                ...standardSiMultiples,
                ...standardSiSubmultiples,
            ];
            expectedPrefixes.forEach(prefix => {
                expect(UnitPrefixes).toHaveProperty(prefix);
            });
        });
    });
    describe('prefixBySymbol', () => {
        it('should return the correct value for the default prefix', () => {
            const prefix = prefixBySymbol('');
            expect(prefix?.symbol).toBe('');
            expect(prefix?.siName).toBe('');
            expect(prefix?.exp).toBe(0);
            expect(prefix?.auxiliar).toBe(false);
        });
        it('should return the correct value for a standard prefix', () => {
            const prefix = prefixBySymbol('k');
            expect(prefix?.symbol).toBe('k');
            expect(prefix?.siName).toBe('kilo');
            expect(prefix?.exp).toBe(3);
            expect(prefix?.auxiliar).toBe(false);
        });
        it('should return the correct value for a prefix alias', () => {
            const prefix = prefixBySymbol('u');
            expect(prefix?.symbol).toBe('µ');
            expect(prefix?.siName).toBe('micro');
            expect(prefix?.exp).toBe(-6);
            expect(prefix?.auxiliar).toBe(false);
        });
    });
    describe('bestPrefixByValue', () => {
        it('should return the default prefix for zero value', () => {
            const prefix = bestPrefixByValue(0);
            expect(prefix).toBe(UnitPrefixes['']);
        });
        it('should return the correct prefix for a positive exponent', () => {
            const prefix = bestPrefixByValue(1000);
            expect(prefix?.symbol).toBe('k');
            expect(prefix?.siName).toBe('kilo');
            expect(prefix?.exp).toBe(3);
            expect(prefix?.auxiliar).toBe(false);
        });
        it('should return the correct prefix for a negative value', () => {
            const prefix = bestPrefixByValue(0.001);
            expect(prefix?.symbol).toBe('m');
            expect(prefix?.siName).toBe('milli');
            expect(prefix?.exp).toBe(-3);
            expect(prefix?.auxiliar).toBe(false);
        });
        it('should return the correct prefix for a very small value', () => {
            const prefix = bestPrefixByValue(1e-40);
            expect(prefix?.symbol).toBe('q');
            expect(prefix?.siName).toBe('quecto');
            expect(prefix?.exp).toBe(-30);
            expect(prefix?.auxiliar).toBe(false);
        });
        it('should return the correct prefix for a very large value', () => {
            const prefix = bestPrefixByValue(1e40);
            expect(prefix?.symbol).toBe('Q');
            expect(prefix?.siName).toBe('quetta');
            expect(prefix?.exp).toBe(30);
            expect(prefix?.auxiliar).toBe(false);
        });
    });
});
