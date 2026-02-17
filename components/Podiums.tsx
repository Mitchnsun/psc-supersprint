import { isEmpty } from '@/lib/utils';
import Time from '@/utils/time';
import { ResultTypeWithId } from '@/utils/types';

const Podiums = ({ category, results }: { category: string; results: ResultTypeWithId[] }) => {
  const men = results.filter(({ cat, sex }) => (isEmpty(category) || category === cat) && sex === 'M');
  const women = results.filter(({ cat, sex }) => (isEmpty(category) || category === cat) && sex === 'F');

  return (
    <div className="grow">
      <div className="grid grid-cols-2 gap-1">
        <h2 className="text-secondary text-xl font-bold">Hommes</h2>
        <h2 className="text-secondary text-xl font-bold">Femmes</h2>
        <div>
          {men.slice(0, 3).map((item, index) => (
            <p key={`${item.firstname}-${item.lastname}-${index}`}>
              {index + 1}. {item.firstname} {item.lastname} - {Time.convert(item.total)}
            </p>
          ))}
        </div>
        <div>
          {women.slice(0, 3).map((item, index) => (
            <p key={`${item.firstname}-${item.lastname}-${index}`}>
              {index + 1}. {item.firstname} {item.lastname} - {Time.convert(item.total)}
            </p>
          ))}
        </div>
        <h2 className="text-secondary col-span-2 text-lg font-bold">Natation</h2>
        <div>
          {men
            .toSorted((a, b) => a.swim - b.swim)
            .slice(0, 3)
            .map((item, index) => (
              <p key={`${item.firstname}-${item.lastname}-${index}`}>
                {index + 1}. {item.firstname} {item.lastname} - {Time.convert(item.swim)}
              </p>
            ))}
        </div>
        <div>
          {women
            .toSorted((a, b) => a.swim - b.swim)
            .slice(0, 3)
            .map((item, index) => (
              <p key={`${item.firstname}-${item.lastname}-${index}`}>
                {index + 1}. {item.firstname} {item.lastname} - {Time.convert(item.swim)}
              </p>
            ))}
        </div>
        <h2 className="text-secondary col-span-2 text-lg font-bold">Vélo</h2>
        <div>
          {men
            .toSorted((a, b) => a.bike - b.bike)
            .slice(0, 3)
            .map((item, index) => (
              <p key={`${item.firstname}-${item.lastname}-${index}`}>
                {index + 1}. {item.firstname} {item.lastname} - {Time.convert(item.bike)}
              </p>
            ))}
        </div>
        <div>
          {women
            .toSorted((a, b) => a.bike - b.bike)
            .slice(0, 3)
            .map((item, index) => (
              <p key={`${item.firstname}-${item.lastname}-${index}`}>
                {index + 1}. {item.firstname} {item.lastname} - {Time.convert(item.bike)}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Podiums;
