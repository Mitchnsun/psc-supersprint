import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import COLORS from '@/styles/colors';
import { CATEGORIES } from '@/utils/categories.utils';
import { ResultTypeWithId, SearchType } from '@/utils/types';
import ResultsTable from './ResultsTable';

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="m-0 text-lg" style={{ fontFamily: 'FontBold', color: COLORS.SECONDARY }}>
    {children}
  </p>
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
        <div className="flex items-center gap-2 my-2">
          <Label>Filtrer par:</Label>
          <Input
            className="h-9"
            value={search.input || ''}
            placeholder="Nom ou dossard"
            onChange={(e) => setSearch({ ...search, input: e.target.value })}
          />
          <div className="w-[150px]">
            <Select value={search.cat || ''} onValueChange={(value) => setSearch({ ...search, cat: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucun filtre</SelectItem>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label} ({cat.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-[150px]">
            <Select value={search.gender || ''} onValueChange={(value) => setSearch({ ...search, gender: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucun filtre</SelectItem>
                <SelectItem value="M">Homme (M)</SelectItem>
                <SelectItem value="F">Femme (F)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      <ResultsTable results={results} search={search} totals={totals} />
    </>
  );
}
