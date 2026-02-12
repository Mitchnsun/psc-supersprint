import { useEffect, useState } from 'react';
import Title from '@/components/atoms/Title';
import Podium from '@/components/Podiums';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResultTypeWithId } from '@/utils/types';
import { CATEGORIES } from '@/utils/categories.utils';

const PodiumView = ({ year, results = [] }: { year: string; results: ResultTypeWithId[] }) => {
  const [cat, setCat] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Title hLevel="h1">Podiums {year}</Title>
      <div className="flex items-center gap-2 my-2">
        <p className="m-0 text-lg font-bold text-primary">Filtrer par:</p>
        <div className="w-35">
          {isMounted ? (
            <Select value={cat} onValueChange={(value) => setCat(value === 'none' ? '' : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Aucun filtre</SelectItem>
                {CATEGORIES.map((cat, index) => (
                  <SelectItem key={`${cat.id}-${cat.label}-${index}`} value={cat.id}>
                    {cat.label} ({cat.id})
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
