import { describe, expect, test } from 'vitest';

import { DISTANCES_BY_YEAR, getDistances } from './distances';

describe('Utils: Distances', () => {
  describe('DISTANCES_BY_YEAR', () => {
    test('should define distances for all expected years', () => {
      expect(DISTANCES_BY_YEAR).toHaveProperty('2022');
      expect(DISTANCES_BY_YEAR).toHaveProperty('2023');
      expect(DISTANCES_BY_YEAR).toHaveProperty('2024');
      expect(DISTANCES_BY_YEAR).toHaveProperty('2025');
      expect(DISTANCES_BY_YEAR).toHaveProperty('2026');
    });

    test('should have correct distances for 2022', () => {
      expect(DISTANCES_BY_YEAR['2022'].swim.length).toBe(300);
      expect(DISTANCES_BY_YEAR['2022'].bike.length).toBe(6);
      expect(DISTANCES_BY_YEAR['2022'].run.length).toBe(2.5);
    });

    test('should have correct distances for 2023', () => {
      expect(DISTANCES_BY_YEAR['2023'].swim.length).toBe(300);
      expect(DISTANCES_BY_YEAR['2023'].bike.length).toBe(5.8);
      expect(DISTANCES_BY_YEAR['2023'].run.length).toBe(2);
    });

    test('should have correct distances for 2024', () => {
      expect(DISTANCES_BY_YEAR['2024'].swim.length).toBe(300);
      expect(DISTANCES_BY_YEAR['2024'].bike.length).toBe(5.7);
      expect(DISTANCES_BY_YEAR['2024'].run.length).toBe(2.45);
    });

    test('should have correct distances for 2025', () => {
      expect(DISTANCES_BY_YEAR['2025'].swim.length).toBe(300);
      expect(DISTANCES_BY_YEAR['2025'].bike.length).toBe(5.7);
      expect(DISTANCES_BY_YEAR['2025'].run.length).toBe(2.5);
    });

    test('should have correct distances for 2026', () => {
      expect(DISTANCES_BY_YEAR['2026'].swim.length).toBe(300);
      expect(DISTANCES_BY_YEAR['2026'].bike.length).toBe(5.7);
      expect(DISTANCES_BY_YEAR['2026'].run.length).toBe(2.5);
    });
  });

  describe('getDistances()', () => {
    test('should return distances for a known year (string)', () => {
      const distances = getDistances('2022');
      expect(distances.swim.length).toBe(300);
      expect(distances.bike.length).toBe(6);
      expect(distances.run.length).toBe(2.5);
    });

    test('should return distances for a known year (number)', () => {
      const distances = getDistances(2023);
      expect(distances.bike.length).toBe(5.8);
      expect(distances.run.length).toBe(2);
    });

    test('should return distances for 2024', () => {
      const distances = getDistances('2024');
      expect(distances.bike.length).toBe(5.7);
      expect(distances.run.length).toBe(2.45);
    });

    test('should return distances for 2025', () => {
      const distances = getDistances('2025');
      expect(distances.bike.length).toBe(5.7);
      expect(distances.run.length).toBe(2.5);
    });

    test('should return same distances for 2026 as 2025', () => {
      const distances = getDistances('2026');
      expect(distances.swim.length).toBe(300);
      expect(distances.bike.length).toBe(5.7);
      expect(distances.run.length).toBe(2.5);
    });

    test('should return default distances for an unknown year', () => {
      const distances = getDistances('1999');
      const defaultDistances = getDistances('2025');
      expect(distances.swim.length).toBe(defaultDistances.swim.length);
      expect(distances.bike.length).toBe(defaultDistances.bike.length);
      expect(distances.run.length).toBe(defaultDistances.run.length);
    });

    test('should return default distances when year is undefined', () => {
      const distances = getDistances(undefined);
      const defaultDistances = getDistances('2025');
      expect(distances.swim.length).toBe(defaultDistances.swim.length);
      expect(distances.bike.length).toBe(defaultDistances.bike.length);
      expect(distances.run.length).toBe(defaultDistances.run.length);
    });

    test('should return correct unit labels', () => {
      const distances = getDistances('2022');
      expect(distances.swim.unit).toBe('m');
      expect(distances.swim.unit_label).toBe('mètres');
      expect(distances.bike.unit).toBe('km');
      expect(distances.bike.unit_label).toBe('kilomètres');
      expect(distances.run.unit).toBe('km');
      expect(distances.run.unit_label).toBe('kilomètres');
    });
  });
});
