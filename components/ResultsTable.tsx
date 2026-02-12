import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { isEmpty } from '@/lib/utils';
import { ResultTypeWithId, SearchType } from '@/utils/types';
import { cn } from '@/lib/utils';

import LineResult from './LineResult';

const rEx = (item = '', value = '') => {
  const regex = new RegExp(value.toLowerCase());
  return regex.test(item.toString().toLowerCase());
};

const StyledTableCell = ({ children, className, ...props }: React.ComponentProps<typeof TableHead>) => (
  <TableHead {...props} className={cn('text-center font-bold text-base md:p-2 p-0.5 text-secondary', className)}>
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
          <StyledTableCell className="hidden lg:table-cell">Cat.</StyledTableCell>
          <StyledTableCell>Temps</StyledTableCell>
          <StyledTableCell className="hidden lg:table-cell">Nat.</StyledTableCell>
          <StyledTableCell className="hidden lg:table-cell">Vélo</StyledTableCell>
          <StyledTableCell className="hidden lg:table-cell">CAP</StyledTableCell>
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
