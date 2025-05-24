import * as Units from '../';
import { describe, it, expect } from 'vitest';

describe('Units index', () => {
    it('should export Dimensionality utilities', () => {
        expect(Units.fillDimensionality).toBeDefined();
        expect(Units.matchDimensionalities).toBeDefined();
    });
    it('should export Prefix utilities', () => {
        expect(Units.UnitPrefixes).toBeDefined();
        expect(Units.prefixMatchers).toBeDefined();
        expect(Units.prefixSymbols).toBeDefined();
        expect(Units.prefixBySymbol).toBeDefined();
        expect(Units.bestPrefixByValue).toBeDefined();
    });
    it('should export Unit utilities', () => {
        expect(Units.defineUnit).toBeDefined();
    });
});
