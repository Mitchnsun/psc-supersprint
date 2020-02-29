import React from 'react';
import COLORS from '../styles/colors';

const ResultsTable = ({ results }) => (
  <React.Fragment>
    <table>
      <thead>
        <tr>
          <th>Rang</th><th>Nom</th><th>BIB</th><th>Cat.</th><th>Temps</th>
        </tr>
      </thead>
      <tbody>
        {results.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item.firstname} {item.lastname}</td>
            <td>#{item.bib}</td>
            <td>{item.cat}{item.sex}</td>
            <td>{item.times?.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <style jsx>{`
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
    `}</style>
  </React.Fragment>
);

export default ResultsTable;