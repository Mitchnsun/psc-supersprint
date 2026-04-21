import { describe, expect, test } from 'vitest';

import { getWaves, rankResults, schema } from './results';
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

describe('excludeRank schema field', () => {
  const baseData = {
    firstname: 'John',
    lastname: 'Doe',
    gender: 'M',
    status: '',
    bib: 100,
    birthYear: 1990,
    category: 'V1',
    times: { swim: '10:00', bike: '20:00', total: '35:00' },
  };

  test('should default to false when not provided', async () => {
    const result = await schema.validate(baseData);
    expect(result.excludeRank).toBe(false);
  });

  test('should accept true', async () => {
    const result = await schema.validate({ ...baseData, excludeRank: true });
    expect(result.excludeRank).toBe(true);
  });

  test('should accept false', async () => {
    const result = await schema.validate({ ...baseData, excludeRank: false });
    expect(result.excludeRank).toBe(false);
  });
});

describe('rankResults excludeRank filtering', () => {
  const makeResultWithExclude = (
    id: string,
    total: number,
    excludeRank?: boolean,
  ): ResultTypeWithId => ({
    id,
    bib: Number(id),
    bike: 0,
    cat: 'S' as never,
    firstname: 'Athlete',
    lastname: id,
    ranks: { cat: 0, gender: 0, scratch: 0, swim: 0, bike: 0 },
    run: 0,
    sex: 'M',
    status: '',
    swim: 0,
    total,
    excludeRank,
  });

  test('participants with excludeRank true are still included in rankResults (filtering is done at page level)', () => {
    const results = [
      makeResultWithExclude('1', 1000),
      makeResultWithExclude('2', 2000, true),
      makeResultWithExclude('3', 3000),
    ];
    const ranked = rankResults(results);
    expect(ranked.results).toHaveLength(3);
  });

  test('filtering excludeRank before rankResults excludes them from podiums', () => {
    const results = [
      makeResultWithExclude('1', 1000),
      makeResultWithExclude('2', 2000, true),
      makeResultWithExclude('3', 3000),
    ];
    const filtered = results.filter(({ excludeRank }) => !excludeRank);
    const ranked = rankResults(filtered);
    expect(ranked.results).toHaveLength(2);
    expect(ranked.results.find((r) => r.id === '2')).toBeUndefined();
  });
});
