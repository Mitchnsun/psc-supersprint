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
