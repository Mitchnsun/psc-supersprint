import { describe, test, expect } from 'vitest';
import Time from './time';

describe('Utils: Time', () => {
  describe('validTime()', () => {
    test('should return true for valid time', () => {
      expect(Time.valid('')).toBe(true);
      expect(Time.valid('0')).toBe(true);
      expect(Time.valid('59')).toBe(true);
      expect(Time.valid('1:00')).toBe(true);
      expect(Time.valid('59:59')).toBe(true);
      expect(Time.valid('1:00:00')).toBe(true);
      expect(Time.valid('123:59:30')).toBe(true);
    });

    test('should return false for invalid time', () => {
      expect(Time.valid('AB')).toBe(false);
      expect(Time.valid('99')).toBe(false);
      expect(Time.valid('4:60')).toBe(false);
      expect(Time.valid('60:00')).toBe(false);
    });
  });
});
