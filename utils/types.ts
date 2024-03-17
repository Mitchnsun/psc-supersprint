import { CAT } from './categories.utils';

export interface SearchType {
  input?: string;
  cat?: string;
  gender?: string;
}

export interface RanksType {
  cat: number;
  gender: number;
  scratch: number;
}

export interface ResultType {
  bib: number;
  bike: number;
  cat: CAT;
  firstname: string;
  lastname: string;
  ranks: RanksType;
  run: number;
  sex: string;
  status: string;
  swim: number;
  total: number;
}

export interface ResultTypeWithId extends ResultType {
  id: string;
}
