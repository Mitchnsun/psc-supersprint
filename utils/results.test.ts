import { describe, expect, test } from 'vitest';

import { getWaves, schema } from './results';
import { ResultTypeWithId } from './types';

describe('Results Schema Validation', () => {
  describe('bikeNumber field', () => {
    test('should accept valid positive integer', async () => {
      const data = {
        firstname: 'John',
        lastname: 'Doe',
        gender: 'M',
        status: '',
        bib: 100,
        birthYear: 1990,
        category: 'V1',
        bikeNumber: 42,
        times: { swim: '10:00', bike: '20:00', total: '35:00' },
      };
      await expect(schema.validate(data)).resolves.toBeTruthy();
    });

    test('should accept undefined bikeNumber', async () => {
      const data = {
        firstname: 'John',
        lastname: 'Doe',
        gender: 'M',
        status: '',
        bib: 100,
        birthYear: 1990,
        category: 'V1',
        times: { swim: '10:00', bike: '20:00', total: '35:00' },
      };
      await expect(schema.validate(data)).resolves.toBeTruthy();
    });

    test('should transform empty string to undefined for bikeNumber', async () => {
      const data = {
        firstname: 'John',
        lastname: 'Doe',
        gender: 'M',
        status: '',
        bib: 100,
        birthYear: 1990,
        category: 'V1',
        bikeNumber: '',
        times: { swim: '10:00', bike: '20:00', total: '35:00' },
      };
      const result = await schema.validate(data);
      expect(result.bikeNumber).toBeUndefined();
    });

    test('should reject negative bikeNumber', async () => {
      const data = {
        firstname: 'John',
        lastname: 'Doe',
        gender: 'M',
        status: '',
        bib: 100,
        birthYear: 1990,
        category: 'V1',
        bikeNumber: -5,
        times: { swim: '10:00', bike: '20:00', total: '35:00' },
      };
      await expect(schema.validate(data)).rejects.toThrow();
    });

    test('should reject decimal bikeNumber', async () => {
      const data = {
        firstname: 'John',
        lastname: 'Doe',
        gender: 'M',
        status: '',
        bib: 100,
        birthYear: 1990,
        category: 'V1',
        bikeNumber: 42.5,
        times: { swim: '10:00', bike: '20:00', total: '35:00' },
      };
      await expect(schema.validate(data)).rejects.toThrow();
    });
  });

  describe('wave field', () => {
    test('should accept valid positive integer', async () => {
      const data = {
        firstname: 'John',
        lastname: 'Doe',
        gender: 'M',
        status: '',
        bib: 100,
        birthYear: 1990,
        category: 'V1',
        wave: 3,
        times: { swim: '10:00', bike: '20:00', total: '35:00' },
      };
      await expect(schema.validate(data)).resolves.toBeTruthy();
    });

    test('should accept undefined wave', async () => {
      const data = {
        firstname: 'John',
        lastname: 'Doe',
        gender: 'M',
        status: '',
        bib: 100,
        birthYear: 1990,
        category: 'V1',
        times: { swim: '10:00', bike: '20:00', total: '35:00' },
      };
      await expect(schema.validate(data)).resolves.toBeTruthy();
    });

    test('should transform empty string to undefined for wave', async () => {
      const data = {
        firstname: 'John',
        lastname: 'Doe',
        gender: 'M',
        status: '',
        bib: 100,
        birthYear: 1990,
        category: 'V1',
        wave: '',
        times: { swim: '10:00', bike: '20:00', total: '35:00' },
      };
      const result = await schema.validate(data);
      expect(result.wave).toBeUndefined();
    });

    test('should reject negative wave', async () => {
      const data = {
        firstname: 'John',
        lastname: 'Doe',
        gender: 'M',
        status: '',
        bib: 100,
        birthYear: 1990,
        category: 'V1',
        wave: -1,
        times: { swim: '10:00', bike: '20:00', total: '35:00' },
      };
      await expect(schema.validate(data)).rejects.toThrow();
    });

    test('should reject decimal wave', async () => {
      const data = {
        firstname: 'John',
        lastname: 'Doe',
        gender: 'M',
        status: '',
        bib: 100,
        birthYear: 1990,
        category: 'V1',
        wave: 3.5,
        times: { swim: '10:00', bike: '20:00', total: '35:00' },
      };
      await expect(schema.validate(data)).rejects.toThrow();
    });
  });

  describe('both fields together', () => {
    test('should accept both bikeNumber and wave', async () => {
      const data = {
        firstname: 'John',
        lastname: 'Doe',
        gender: 'M',
        status: '',
        bib: 100,
        birthYear: 1990,
        category: 'V1',
        bikeNumber: 42,
        wave: 3,
        times: { swim: '10:00', bike: '20:00', total: '35:00' },
      };
      await expect(schema.validate(data)).resolves.toBeTruthy();
    });
  });
});

const makeResult = (id: string, wave?: number): ResultTypeWithId => ({
  id,
  bib: 1,
  bike: 0,
  cat: 'S' as never,
  firstname: 'John',
  lastname: 'Doe',
  ranks: { cat: 1, gender: 1, scratch: 1, swim: 1, bike: 1 },
  run: 0,
  sex: 'M',
  status: '',
  swim: 0,
  total: 0,
  wave,
});

describe('getWaves', () => {
  test('should return empty array when no results have a wave', () => {
    const results = [makeResult('1'), makeResult('2')];
    expect(getWaves(results)).toEqual([]);
  });

  test('should return sorted unique wave numbers', () => {
    const results = [makeResult('1', 3), makeResult('2', 1), makeResult('3', 2)];
    expect(getWaves(results)).toEqual([1, 2, 3]);
  });

  test('should deduplicate wave values', () => {
    const results = [makeResult('1', 2), makeResult('2', 2), makeResult('3', 1)];
    expect(getWaves(results)).toEqual([1, 2]);
  });

  test('should ignore results without a wave', () => {
    const results = [makeResult('1', 1), makeResult('2'), makeResult('3', 3)];
    expect(getWaves(results)).toEqual([1, 3]);
  });

  test('should return empty array for empty input', () => {
    expect(getWaves([])).toEqual([]);
  });
});
