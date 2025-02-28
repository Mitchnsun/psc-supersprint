import { describe, test, expect } from 'vitest';
import Time from './time';

describe('Utils: Time', () => {
  describe('Time.convert()', () => {
    test('should return formatted time', () => {
      expect(Time.convert('' as never)).toBe('-');
      expect(Time.convert(0)).toBe('-');
      expect(Time.convert(1)).toBe('0:01');
      expect(Time.convert(59)).toBe('0:59');
      expect(Time.convert(60)).toBe('1:00');
      expect(Time.convert(120)).toBe('2:00');
      expect(Time.convert(1200)).toBe('20:00');
      expect(Time.convert(3599)).toBe('59:59');
      expect(Time.convert(3600)).toBe('1:00:00');
      expect(Time.convert(35999)).toBe('9:59:59');
      expect(Time.convert(36000)).toBe('10:00:00');
    });
  });

  describe('Time.maskInput()', () => {
    test('should return formatted time', () => {
      expect(Time.maskInput('')).toBe('');
      expect(Time.maskInput('0')).toBe('0');
      expect(Time.maskInput('59')).toBe('59');
      expect(Time.maskInput('100')).toBe('1:00');
      expect(Time.maskInput('1234')).toBe('12:34');
      expect(Time.maskInput('5959')).toBe('59:59');
      expect(Time.maskInput('10000')).toBe('1:00:00');
      expect(Time.maskInput('1235930')).toBe('123:59:30');
    });
  });

  describe('Time.valid()', () => {
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
