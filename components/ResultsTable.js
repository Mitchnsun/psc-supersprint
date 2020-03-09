import React from 'react';
import COLORS from '../styles/colors';

import LineResult from './LineResult';

const ResultsTable = ({ results, totals }) => (
  <React.Fragment>
    <table style={{ textAlign: 'center' }}>
      <thead>
        <tr>
          <th aria-label="Expand" />
          <th>Rang</th>
          <th>Nom</th>
          <th>BIB</th>
          <th>Cat.</th>
          <th>Temps</th>
          <th>Nat.</th>
          <th>Vélo</th>
          <th>CAP</th>
        </tr>
      </thead>
      <tbody>
        {results.map(item => (
          <LineResult key={item.bib} result={item} totals={totals} />
        ))}
      </tbody>
    </table>
    <style jsx>
      {`
        table {
          border-collapse: collapse;
          margin-top: 1rem;
          width: 100%;
        }
        thead {
          color: ${COLORS.PRIMARY};
          font-family: OpenSansBold;
          font-weight: bold;
          font-size: 1.1rem;
        }
        tbody {
          border-spacing: 0;
          border-collapse: collapse;
        }
        tr {
          height: 2.5rem;
          border-bottom: 1px solid ${COLORS.GRAY};
          outline: 0;
          vertical-align: middle;
        }
      `}
    </style>
  </React.Fragment>
);

export default ResultsTable;
