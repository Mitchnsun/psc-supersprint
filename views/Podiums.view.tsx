import { useEffect, useState } from 'react';

import Title from '@/components/atoms/Title';
import Podium from '@/components/Podiums';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES } from '@/utils/categories.utils';
import { ResultTypeWithId } from '@/utils/types';

const PodiumView = ({ year, results = [] }: { year: string; results: ResultTypeWithId[] }) => {
  const [cat, setCat] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Title hLevel="h1">Podiums {year}</Title>
      <div className="my-2 flex items-center gap-2">
        <p className="text-secondary m-0 text-lg font-bold">Filtrer par:</p>
        <div className="w-35">
          {isMounted ? (
            <Select value={cat} onValueChange={(value) => setCat(value === 'none' ? '' : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Aucun filtre</SelectItem>
                {CATEGORIES.map((categ, index) => (
                  <SelectItem key={`${categ.id}-${categ.label}-${index}`} value={categ.id}>
                    {categ.label} ({categ.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex h-9 w-full items-center justify-between gap-2 rounded-md bg-transparent px-3 py-2 text-sm shadow-sm">
              <span className="text-zinc-400">Catégories</span>
            </div>
          )}
        </div>
      </div>
      <Podium category={cat} results={results} />
    </>
  );
};

export default PodiumView;
