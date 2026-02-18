import { CAT } from './categories.utils';

export interface SearchType {
  input?: string;
  cat?: string;
  gender?: string;
  wave?: string;
}

export interface RanksType {
  cat: number;
  gender: number;
  scratch: number;
  swim: number;
  bike: number;
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
  bikeNumber?: number;
  wave?: number;
}

export interface ResultTypeWithId extends ResultType {
  id: string;
}
