import { describe, expect, test } from 'vitest';

import { schema } from './results';

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
