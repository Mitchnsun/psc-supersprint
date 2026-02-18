import { ReactNode, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES } from '@/utils/categories.utils';
import { ResultTypeWithId, SearchType } from '@/utils/types';

import ResultsTable from './ResultsTable';

const Label = ({ children }: { children: ReactNode }) => (
  <p className="text-secondary m-0 text-lg font-bold">{children}</p>
);

export default function Board({
  results,
  totals,
  hideSearchBar,
}: {
  results: ResultTypeWithId[];
  totals: Record<string, number>;
  hideSearchBar?: boolean;
}) {
  const [search, setSearch] = useState<SearchType>({});

  return (
    <>
      {!hideSearchBar && (
        <div className="my-2 flex flex-wrap items-center gap-2">
          <Label>Filtrer par:</Label>
          <Input
            name="search"
            className="h-9 max-w-1/2 lg:max-w-1/3"
            value={search.input || ''}
            placeholder="Nom ou dossard"
            onChange={(e) => setSearch({ ...search, input: e.target.value })}
          />
          <div className="w-35">
            <Select
              value={search.cat}
              onValueChange={(value) => setSearch({ ...search, cat: value === 'none' ? '' : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Aucun filtre</SelectItem>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label} ({cat.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-35">
            <Select
              value={search.gender}
              onValueChange={(value) => setSearch({ ...search, gender: value === 'none' ? '' : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Aucun filtre</SelectItem>
                <SelectItem value="M">Homme (M)</SelectItem>
                <SelectItem value="F">Femme (F)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-35">
            <Select
              value={search.wave}
              onValueChange={(value) => setSearch({ ...search, wave: value === 'none' ? '' : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Vague" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Aucun filtre</SelectItem>
                <SelectItem value="1">Vague 1</SelectItem>
                <SelectItem value="2">Vague 2</SelectItem>
                <SelectItem value="3">Vague 3</SelectItem>
                <SelectItem value="4">Vague 4</SelectItem>
                <SelectItem value="5">Vague 5</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      <ResultsTable results={results} search={search} totals={totals} />
    </>
  );
}
