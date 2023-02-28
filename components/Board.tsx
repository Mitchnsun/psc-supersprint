import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { FormControl, Grid, MenuItem, TextField } from '@mui/material';
import COLORS from '@/styles/colors';
import { CATEGORIES } from '@/utils/categories.utils';
import { ResultTypeWithId, SearchType } from '@/utils/types';
import ResultsTable from './ResultsTable';

const Label = styled('p')`
  margin: 0;
  font-size: 1.1rem;
  font-family: 'FontBold';
  color: ${COLORS.PRIMARY};
`;

export default function Board({ results, totals }: { results: ResultTypeWithId[]; totals: Record<string, number> }) {
  const [search, setSearch] = useState<SearchType>({});

  return (
    <>
      <Grid container spacing={1} alignItems="center" style={{ margin: '0.5rem 0' }}>
        <Grid item>
          <Label>Filtrer par:</Label>
        </Grid>
        <Grid item>
          <TextField
            size="small"
            value={search.input}
            placeholder="Nom ou dossard"
            onChange={(e) => setSearch({ ...search, input: e.target.value })}
          />
        </Grid>
        <Grid item width={150}>
          <FormControl fullWidth>
            <TextField
              size="small"
              value={search.cat || ''}
              label="Catégories"
              select
              onChange={(e) => setSearch({ ...search, cat: e.target.value })}
            >
              <MenuItem value="">Aucun filtre</MenuItem>
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.label} ({cat.id})
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item width={150}>
          <FormControl fullWidth>
            <TextField
              size="small"
              value={search.gender || ''}
              label="Genre"
              select
              onChange={(e) => setSearch({ ...search, gender: e.target.value })}
            >
              <MenuItem value="">Aucun filtre</MenuItem>
              <MenuItem value="M">Homme (M)</MenuItem>
              <MenuItem value="F">Femme (F)</MenuItem>
            </TextField>
          </FormControl>
        </Grid>
      </Grid>
      <ResultsTable results={results} search={search} totals={totals} />
    </>
  );
}
