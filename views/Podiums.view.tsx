import { useState } from 'react';
import Title from '@/components/atoms/Title';
import Podium from '@/components/Podiums';
import { styled } from '@mui/material/styles';
import { ResultTypeWithId } from '@/utils/types';
import COLORS from '@/styles/colors';
import { CATEGORIES } from '@/utils/categories.utils';
import { FormControl, Grid, MenuItem, TextField } from '@mui/material';

const Label = styled('p')`
  margin: 0;
  font-size: 1.1rem;
  font-family: 'FontBold';
  color: ${COLORS.PRIMARY};
`;

const PodiumView = ({ year, results = [] }: { year: string; results: ResultTypeWithId[] }) => {
  const [cat, setCat] = useState<string>('');

  return (
    <>
      <Title hLevel="h1">Podiums {year}</Title>
      <Grid container spacing={1} alignItems="center" style={{ margin: '0.5rem 0' }}>
        <Grid item>
          <Label>Filtrer par:</Label>
        </Grid>
        <Grid item width={150}>
          <FormControl fullWidth>
            <TextField
              size="small"
              value={cat || ''}
              label="Catégories"
              select
              onChange={(e) => setCat(e.target.value)}
            >
              <MenuItem value="">Aucun filtre</MenuItem>
              {CATEGORIES.map((cat, index) => (
                <MenuItem key={`${cat.id}-${cat.label}-${index}`} value={cat.id}>
                  {cat.label} ({cat.id})
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
      </Grid>
      <Podium category={cat} results={results} />
    </>
  );
};

export default PodiumView;
