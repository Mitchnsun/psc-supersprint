import React, { useState } from 'react';
import useSWR from 'swr';
import { get } from 'lodash';

import ResultsTable from '../components/ResultsTable';
import Title from '../components/atoms/Title';
import COLORS from '../styles/colors';

async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

export default function Results() {
  const [search, setSearch] = useState({});
  const { data } = useSWR('/api/results?year=2020', fetcher);
  const results = get(data, 'results', []);
  const totals = get(data, 'totals', {});

  return (
    <React.Fragment>
      <Title hLevel={1}>Résultats 2020</Title>
      <div className="searchBar">
        <p>Filtrer par:</p>
        <input
          type="text"
          value={search.input}
          placeholder="Nom ou dossard"
          onChange={e => setSearch({ ...search, input: e.target.value })}
        />
        <select onChange={e => setSearch({ ...search, cat: e.target.value })}>
          <option value="">Catégories:</option>
          <option value="V">Vétéran (V)</option>
          <option value="S">Senior (S)</option>
          <option value="J">Junior (J)</option>
          <option value="C">Cadet (C)</option>
          <option value="M">Minime (M)</option>
          <option value="B">Benjamin (B)</option>
        </select>
        <select onChange={e => setSearch({ ...search, gender: e.target.value })}>
          <option value="">Genre:</option>
          <option value="M">Homme (M)</option>
          <option value="F">Femme (F)</option>
        </select>
      </div>
      <ResultsTable results={results} search={search} totals={totals} />
      <style jsx>
        {`
          .searchBar {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin: 1rem 0;
          }
          input {
            margin: 0.25rem;
            box-sizing: border-box;
            border: 1px solid ${COLORS.GRAY_DARK};
            padding: 5px 7px;
            height: 35px;
          }
          select {
            margin: 0.25rem;
            padding: 5px 7px;
            background: none;
            box-sizing: border-box;
            border: 1px solid ${COLORS.GRAY_DARK};
            border-radius: 0;
            height: 35px;
          }
          p {
            margin: 0.25rem;
            font-size: 1.1rem;
            font-family: 'OpenSansBold';
            color: ${COLORS.PRIMARY};
          }
        `}
      </style>
    </React.Fragment>
  );
}
