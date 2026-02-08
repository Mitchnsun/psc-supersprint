import { useState } from 'react';
import Title from '@/components/atoms/Title';
import Podium from '@/components/Podiums';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResultTypeWithId } from '@/utils/types';
import COLORS from '@/styles/colors';
import { CATEGORIES } from '@/utils/categories.utils';

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="m-0 text-lg" style={{ fontFamily: 'FontBold', color: COLORS.PRIMARY }}>
    {children}
  </p>
);

const PodiumView = ({ year, results = [] }: { year: string; results: ResultTypeWithId[] }) => {
  const [cat, setCat] = useState<string>('');

  return (
    <>
      <Title hLevel="h1">Podiums {year}</Title>
      <div className="flex items-center gap-2 my-2">
        <Label>Filtrer par:</Label>
        <div className="w-[150px]">
          <Select value={cat || ''} onValueChange={(value) => setCat(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Aucun filtre</SelectItem>
              {CATEGORIES.map((cat, index) => (
                <SelectItem key={`${cat.id}-${cat.label}-${index}`} value={cat.id}>
                  {cat.label} ({cat.id})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Podium category={cat} results={results} />
    </>
  );
};

export default PodiumView;
