import { isEmpty } from '@/lib/utils';

export enum CAT {
  V = 'V',
  S = 'S',
  J = 'J',
  C = 'C',
  M = 'M',
  B = 'B',
}

export enum CAT_LABEL {
  V = 'Vétéran',
  S = 'Sénior',
  J = 'Junior',
  C = 'Cadet',
  M = 'Minime',
  B = 'Benjamins',
}

export const CATEGORIES = [
  { id: CAT.V, label: CAT_LABEL.V, min: 40, max: 99 },
  { id: CAT.S, label: CAT_LABEL.S, min: 20, max: 39 },
  { id: CAT.J, label: CAT_LABEL.J, min: 18, max: 19 },
  { id: CAT.C, label: CAT_LABEL.C, min: 16, max: 17 },
  { id: CAT.M, label: CAT_LABEL.M, min: 14, max: 15 },
  { id: CAT.B, label: CAT_LABEL.B, min: 12, max: 13 },
];

export const categoryFromBirthYear = (year: number) => {
  const today = new Date().getFullYear();
  const age = today - year;
  const category = CATEGORIES.find((cat) => cat.min <= age && age <= cat.max);
  return !isEmpty(category) ? category : { id: CAT.S, label: CAT_LABEL.S, min: 20, max: 39 };
};
