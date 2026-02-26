import { YEAR } from './constants';
import { FormValues } from './results';

export type DraftResult = {
  id: string;
  savedAt: number;
} & Partial<FormValues>;

const STORAGE_KEY = `psc-drafts-${YEAR}`;

export const loadDrafts = (): DraftResult[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as DraftResult[]) : [];
  } catch {
    return [];
  }
};

export const saveDraftsToStorage = (drafts: DraftResult[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
};
