import { Share as ShareIcon } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';

import { YEAR } from '@/utils/constants';
import GlobalContext from '@/utils/context/global.context';
import Time from '@/utils/time';
import { ResultTypeWithId } from '@/utils/types';

import ActivityResult from './atoms/ActivityResult';
import BikeIcon from './atoms/BikeIcon';
import Ranks from './atoms/Ranks';
import RunIcon from './atoms/RunIcon';
import SwimIcon from './atoms/SwimIcon';

const DetailsResult = ({ result, totals }: { result: ResultTypeWithId; totals: Record<string, number> }) => {
  const { context } = useContext(GlobalContext);
  return (
    <div className="grid grid-cols-12 justify-center gap-2 p-2">
      <Ranks ranks={result.ranks} cat={result.cat} gender={result.sex} totals={totals} />
      {(result.bikeNumber || result.wave) && (
        <div className="col-span-12 text-center text-sm">
          {result.bikeNumber && `Vélo #${result.bikeNumber}`}
          {result.bikeNumber && result.wave && ' | '}
          {result.wave && `Vague ${result.wave}`}
        </div>
      )}
      <ActivityResult
        icon={<SwimIcon />}
        label="Natation"
        time={Time.convert(result.swim)}
        speed={Time.swim(result.swim)}
        unit="/100m"
      />
      <ActivityResult
        icon={<BikeIcon />}
        label="Vélo"
        time={Time.convert(result.bike)}
        speed={Time.bike(result.bike)}
        unit="km/h"
      />
      <ActivityResult
        icon={<RunIcon />}
        label="Course à pied"
        time={Time.convert(result.run)}
        speed={Time.run(result.run)}
        unit="/km"
      />
      <div className="col-span-2 m-auto text-center">
        <Link href={`/athlete/${context.year || YEAR}/${result.id}`}>
          <ShareIcon className="text-logo" />
        </Link>
      </div>
    </div>
  );
};

export default DetailsResult;
