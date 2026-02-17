import { describe, expect, test } from 'vitest';

import { cn, compact, isEmpty } from '@/lib/utils';

describe('cn', () => {
  test('should merge class names', () => {
    expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500');
  });

  test('should handle conditional classes', () => {
    expect(cn('base-class', { active: true, disabled: false })).toBe('base-class active');
  });

  test('should override conflicting tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  test('should handle undefined and null values', () => {
    expect(cn('text-base', undefined, 'font-bold', null)).toBe('text-base font-bold');
  });

  test('should handle arrays of classes', () => {
    expect(cn(['text-sm', 'text-center'])).toBe('text-sm text-center');
  });

  test('should handle empty input', () => {
    expect(cn()).toBe('');
  });

  test('should merge complex tailwind classes correctly', () => {
    expect(cn('p-4 m-2', 'p-6')).toBe('m-2 p-6');
  });
});

describe('isEmpty', () => {
  test('should return true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  test('should return true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  test('should return true for empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  test('should return false for non-empty string', () => {
    expect(isEmpty('hello')).toBe(false);
  });

  test('should return true for empty array', () => {
    expect(isEmpty([])).toBe(true);
  });

  test('should return false for non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  test('should return true for empty object', () => {
    expect(isEmpty({})).toBe(true);
  });

  test('should return false for non-empty object', () => {
    expect(isEmpty({ key: 'value' })).toBe(false);
  });

  test('should return false for number', () => {
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(42)).toBe(false);
  });

  test('should return false for boolean', () => {
    expect(isEmpty(true)).toBe(false);
    expect(isEmpty(false)).toBe(false);
  });

  test('should return false for string with whitespace', () => {
    expect(isEmpty(' ')).toBe(false);
    expect(isEmpty('  ')).toBe(false);
  });
});

describe('compact', () => {
  test('should remove null values from array', () => {
    expect(compact([1, null, 2, null, 3])).toEqual([1, 2, 3]);
  });

  test('should remove undefined values from array', () => {
    expect(compact([1, undefined, 2, undefined, 3])).toEqual([1, 2, 3]);
  });

  test('should remove false values from array', () => {
    expect(compact([1, false, 2, false, 3])).toEqual([1, 2, 3]);
  });

  test('should remove empty strings from array', () => {
    expect(compact(['a', '', 'b', '', 'c'])).toEqual(['a', 'b', 'c']);
  });

  test('should remove 0 from array', () => {
    expect(compact([1, 0, 2, 0, 3])).toEqual([1, 2, 3]);
  });

  test('should keep true values', () => {
    expect(compact([true, false, true, false])).toEqual([true, true]);
  });

  test('should handle empty array', () => {
    expect(compact([])).toEqual([]);
  });

  test('should handle array with all falsy values', () => {
    expect(compact([null, undefined, false, '', 0])).toEqual([]);
  });

  test('should handle array with all truthy values', () => {
    expect(compact([1, 2, 'hello', true, { key: 'value' }])).toEqual([1, 2, 'hello', true, { key: 'value' }]);
  });

  test('should handle mixed types', () => {
    expect(compact([1, null, 'test', undefined, true, false, 0, 'hello'])).toEqual([1, 'test', true, 'hello']);
  });

  test('should preserve objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    expect(compact([obj1, null, obj2, undefined])).toEqual([obj1, obj2]);
  });
});
