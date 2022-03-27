import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import COLORS from '../styles/colors';
import BREAKPOINT from '../styles/breakpoints';

import LineResult from './LineResult';

const rEx = (item = '', value = '') => {
  const regex = new RegExp(value.toLowerCase());
  return regex.test(item.toString().toLowerCase());
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: COLORS.PRIMARY,
  textAlign: 'center',
  fontFamily: 'OpenSansBold',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  [theme.breakpoints.down('sm')]: {
    padding: 2,
  }
}));

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
    <Table size="small">
      <TableHead>
        <TableRow>
          <StyledTableCell aria-label="Expand" />
          <StyledTableCell>Rang</StyledTableCell>
          <StyledTableCell>Nom</StyledTableCell>
          <StyledTableCell>Dossard</StyledTableCell>
          {width > BREAKPOINT && <StyledTableCell>Cat.</StyledTableCell>}
          <StyledTableCell>Temps</StyledTableCell>
          {width > BREAKPOINT && (
            <React.Fragment>
              <StyledTableCell>Nat.</StyledTableCell>
              <StyledTableCell>Vélo</StyledTableCell>
              <StyledTableCell>CAP</StyledTableCell>
            </React.Fragment>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map((item, index) => (
          <LineResult
            key={item.bib}
            result={item}
            totals={totals}
            rank={search.input ? item.ranks.scratch : index + 1}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default ResultsTable;
