import isEmpty from 'lodash/isEmpty';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import COLORS from '@/styles/colors';
import { ResultTypeWithId, SearchType } from '@/utils/types';

import LineResult from './LineResult';

const rEx = (item = '', value = '') => {
  const regex = new RegExp(value.toLowerCase());
  return regex.test(item.toString().toLowerCase());
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: COLORS.PRIMARY,
  textAlign: 'center',
  fontFamily: 'FontBold',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  [theme.breakpoints.down('sm')]: {
    padding: 2,
  },
}));

const ResultsTable = ({
  results,
  search = {},
  totals,
}: {
  results: ResultTypeWithId[];
  search?: SearchType;
  totals: Record<string, number>;
}) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const { input, cat, gender } = search;
  const list = results.filter(
    (item) =>
      (rEx(item.bib.toString(), input) || rEx(item.firstname, input) || rEx(item.lastname, input)) &&
      rEx(item.cat, cat) &&
      rEx(item.sex, gender) &&
      isEmpty(item.status),
  );
  const statusList = results.filter((item) => !isEmpty(item.status));

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <StyledTableCell aria-label="Expand" />
          <StyledTableCell>Rang</StyledTableCell>
          <StyledTableCell>Nom</StyledTableCell>
          <StyledTableCell>Dossard</StyledTableCell>
          {isLargeScreen && <StyledTableCell>Cat.</StyledTableCell>}
          <StyledTableCell>Temps</StyledTableCell>
          {isLargeScreen && (
            <>
              <StyledTableCell>Nat.</StyledTableCell>
              <StyledTableCell>Vélo</StyledTableCell>
              <StyledTableCell>CAP</StyledTableCell>
            </>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {[...list, ...statusList].map((item, index) => (
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
