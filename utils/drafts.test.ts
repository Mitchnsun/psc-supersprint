import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import { DraftResult, loadDrafts, saveDraftsToStorage } from './drafts';

const mockDraft: DraftResult = {
  id: '1',
  savedAt: 1000,
  firstname: 'John',
  lastname: 'Doe',
  bib: 42,
};

describe('drafts utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('loadDrafts', () => {
    test('should return empty array when localStorage has no drafts', () => {
      expect(loadDrafts()).toEqual([]);
    });

    test('should return saved drafts from localStorage', () => {
      const drafts = [mockDraft];
      localStorage.setItem('psc-drafts-2026', JSON.stringify(drafts));
      expect(loadDrafts()).toEqual(drafts);
    });

    test('should return empty array when localStorage contains invalid JSON', () => {
      localStorage.setItem('psc-drafts-2026', 'invalid json');
      expect(loadDrafts()).toEqual([]);
    });
  });

  describe('saveDraftsToStorage', () => {
    test('should save drafts to localStorage', () => {
      const drafts = [mockDraft];
      saveDraftsToStorage(drafts);
      const stored = localStorage.getItem('psc-drafts-2026');
      expect(JSON.parse(stored!)).toEqual(drafts);
    });

    test('should overwrite existing drafts in localStorage', () => {
      const initial = [mockDraft];
      saveDraftsToStorage(initial);
      const updated = [{ ...mockDraft, id: '2', firstname: 'Jane' }];
      saveDraftsToStorage(updated);
      const stored = localStorage.getItem('psc-drafts-2026');
      expect(JSON.parse(stored!)).toEqual(updated);
    });

    test('should save empty array to localStorage', () => {
      saveDraftsToStorage([]);
      const stored = localStorage.getItem('psc-drafts-2026');
      expect(JSON.parse(stored!)).toEqual([]);
    });
  });
});
