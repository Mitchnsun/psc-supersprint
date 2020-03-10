import React, { useState, useEffect } from 'react';
import COLORS from '../styles/colors';
import BREAKPOINT from '../styles/breakpoints';

import LineResult from './LineResult';

const rEx = (item = '', value = '') => {
  const regex = new RegExp(value.toLowerCase());
  return regex.test(item.toString().toLowerCase());
};

const ResultsTable = ({ results, search = {}, totals }) => {
  const { input, cat, gender } = search;
  const list = results.filter(
    item =>
      (rEx(item.bib, input) || rEx(item.firstname, input) || rEx(item.lastname, input)) &&
      rEx(item.cat, cat) &&
      rEx(item.sex, gender),
  );

  const [width, setWidth] = useState(process.browser ? window.innerWidth : BREAKPOINT + 1);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      <table style={{ textAlign: 'center' }}>
        <thead>
          <tr>
            <th aria-label="Expand" />
            <th>Rang</th>
            <th>Nom</th>
            <th>BIB</th>
            {width > BREAKPOINT && <th>Cat.</th>}
            <th>Temps</th>
            {width > BREAKPOINT && (
              <React.Fragment>
                <th>Nat.</th>
                <th>Vélo</th>
                <th>CAP</th>
              </React.Fragment>
            )}
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <LineResult
              key={item.bib}
              result={item}
              totals={totals}
              rank={search.input ? item.ranks.scratch : index + 1}
            />
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
};

export default ResultsTable;
