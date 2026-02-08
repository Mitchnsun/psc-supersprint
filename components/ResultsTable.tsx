import isEmpty from 'lodash/isEmpty';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import COLORS from '@/styles/colors';
import { ResultTypeWithId, SearchType } from '@/utils/types';

import LineResult from './LineResult';

const rEx = (item = '', value = '') => {
  const regex = new RegExp(value.toLowerCase());
  return regex.test(item.toString().toLowerCase());
};

const StyledTableCell = ({ children, ...props }: React.ComponentProps<typeof TableHead>) => (
  <TableHead
    {...props}
    className="text-center font-bold text-base md:p-2 p-0.5"
    style={{
      color: COLORS.SECONDARY,
      fontFamily: 'FontBold',
    }}
  >
    {children}
  </TableHead>
);

const ResultsTable = ({
  results,
  search = {},
  totals,
}: {
  results: ResultTypeWithId[];
  search?: SearchType;
  totals: Record<string, number>;
}) => {
  const isLargeScreen = useMediaQuery('(min-width: 900px)');
  const { input, cat, gender } = search;
  const list = results.filter(
    (item) =>
      (rEx(item.bib.toString(), input) || rEx(item.firstname, input) || rEx(item.lastname, input)) &&
      rEx(item.cat, cat) &&
      rEx(item.sex, gender) &&
      isEmpty(item.status),
  );
  const hasFilters = input || cat || gender;
  const statusList = results.filter((item) => !isEmpty(item.status) && !hasFilters);

  return (
    <Table>
      <TableHeader>
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
      </TableHeader>
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
