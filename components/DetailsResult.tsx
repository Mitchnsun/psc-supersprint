import Link from 'next/link';
import { Grid } from '@mui/material';
import ShareIcon from '@mui/icons-material/IosShare';
import Time from '../utils/time';
import { ResultTypeWithId } from '../utils/types';
import SwimIcon from './atoms/SwimIcon';
import BikeIcon from './atoms/BikeIcon';
import RunIcon from './atoms/RunIcon';
import Ranks from './atoms/Ranks';
import ActivityResult from './atoms/ActivityResult';

const DetailsResult = ({ result, totals }: { result: ResultTypeWithId; totals: Record<string, number> }) => (
  <Grid container spacing={2} justifyContent="center" style={{ padding: '0.5rem' }}>
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
    <Grid item xs={2} sx={{ textAlign: 'center', margin: 'auto' }}>
      <Link href={`/athlete/${result.id}`}>
        <ShareIcon color="secondary" />
      </Link>
    </Grid>
  </Grid>
);

export default DetailsResult;
