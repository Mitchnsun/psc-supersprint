import React from 'react';
import COLORS from '../styles/colors';

import TimeCell from './atoms/TimeCell';

const ResultsTable = ({ results }) => (
  <React.Fragment>
    <table>
      <thead>
        <tr>
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
        {results.map((item, index) => (
          <tr key={item.bib}>
            <td>{index + 1}</td>
            <td>{`${item.firstname} ${item.lastname}`}</td>
            <td>{`#${item.bib}`}</td>
            <td>{`${item.cat}${item.sex}`}</td>
            <TimeCell time={item.total} />
            <TimeCell time={item.swim} />
            <TimeCell time={item.bike} />
            <TimeCell time={item.run} />
          </tr>
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
          font-size: 1.25rem;
        }
        tr {
          height: 2.5rem;
          border-bottom: 1px solid ${COLORS.GRAY};
        }
        td {
          text-align: center;
        }
        tbody tr:hover {
          background-color: ${COLORS.GRAY};
        }
      `}
    </style>
  </React.Fragment>
);

export default ResultsTable;
