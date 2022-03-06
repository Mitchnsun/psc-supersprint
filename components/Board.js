import React, { useState } from 'react';
import ResultsTable from './ResultsTable';
import COLORS from '../styles/colors';
import { CATEGORIES } from '../utils/categories.utils'

export default function Board({ results, totals }) {
  const [search, setSearch] = useState({});

  return (
    <React.Fragment>
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
          {CATEGORIES.map(cat => <option value={cat.id}>{cat.label} ({cat.id})</option>)}
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
