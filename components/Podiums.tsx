import { isEmpty } from '@/lib/utils';
import Time from '@/utils/time';
import { ResultTypeWithId } from '@/utils/types';

type Field = 'total' | 'swim' | 'bike';

interface PodiumListProps {
  items: ResultTypeWithId[];
  field: Field;
}

const top3 = (items: ResultTypeWithId[], field: Field) =>
  items
    .filter((r) => r[field] > 0)
    .toSorted((a, b) => a[field] - b[field])
    .slice(0, 3);

const PodiumList = ({ items, field }: PodiumListProps) => (
  <div>
    {items.map((item, index) => (
      <p key={`${item.firstname}-${item.lastname}-${index}`}>
        {index + 1}. {item.firstname} {item.lastname} - {Time.convert(item[field])}
      </p>
    ))}
  </div>
);

const Podiums = ({ category, results }: { category: string; results: ResultTypeWithId[] }) => {
  const bySex = (sex: 'M' | 'F') =>
    results.filter(({ cat, sex: s }) => (isEmpty(category) || category === cat) && s === sex);

  const men = bySex('M');
  const women = bySex('F');

  return (
    <div className="grow">
      <div className="grid grid-cols-2 gap-1">
        <h2 className="text-secondary text-xl font-bold">Hommes</h2>
        <h2 className="text-secondary text-xl font-bold">Femmes</h2>
        <PodiumList items={top3(men, 'total')} field="total" />
        <PodiumList items={top3(women, 'total')} field="total" />
        <h2 className="text-secondary col-span-2 text-lg font-bold">Natation</h2>
        <PodiumList items={top3(men, 'swim')} field="swim" />
        <PodiumList items={top3(women, 'swim')} field="swim" />
        <h2 className="text-secondary col-span-2 text-lg font-bold">Vélo</h2>
        <PodiumList items={top3(men, 'bike')} field="bike" />
        <PodiumList items={top3(women, 'bike')} field="bike" />
      </div>
    </div>
  );
};

export default Podiums;
