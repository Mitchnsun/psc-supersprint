import { useContext } from 'react';
import Link from 'next/link';
import { Share as ShareIcon } from 'lucide-react';
import Time from '@/utils/time';
import { YEAR } from '@/utils/constants';
import { ResultTypeWithId } from '@/utils/types';
import GlobalContext from '@/utils/context/global.context';
import COLORS from '@/styles/colors';
import SwimIcon from './atoms/SwimIcon';
import BikeIcon from './atoms/BikeIcon';
import RunIcon from './atoms/RunIcon';
import Ranks from './atoms/Ranks';
import ActivityResult from './atoms/ActivityResult';

const DetailsResult = ({ result, totals }: { result: ResultTypeWithId; totals: Record<string, number> }) => {
  const { context } = useContext(GlobalContext);
  return (
    <div className="grid grid-cols-12 gap-2 justify-center p-2">
      <Ranks ranks={result.ranks} cat={result.cat} gender={result.sex} totals={totals} />
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
      <div className="col-span-2 text-center m-auto">
        <Link href={`/athlete/${context.year || YEAR}/${result.id}`}>
          <ShareIcon style={{ fill: COLORS.LOGO }} />
        </Link>
      </div>
    </div>
  );
};

export default DetailsResult;
