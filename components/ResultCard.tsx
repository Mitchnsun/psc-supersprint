import { Card } from '@/components/ui/card';
import { isEmpty } from '@/lib/utils';
import Time from '@/utils/time';
import { ResultType } from '@/utils/types';

import ActivityResult from './atoms/ActivityResult';
import BikeIcon from './atoms/BikeIcon';
import RunIcon from './atoms/RunIcon';
import SwimIcon from './atoms/SwimIcon';
import Title from './atoms/Title';

const ResultCard = ({ result }: { result: ResultType }) => (
  <Card className="bg-primary border-secondary rounded-none pb-8 text-center">
    <Title hLevel="h2">Finisher</Title>
    <Title hLevel="h3">
      {result.firstname} {result.lastname}
    </Title>
    <Card className="mx-8 my-16 border-0 bg-white p-4">
      <p className="text-logo m-0 p-2 text-5xl font-bold">
        {isEmpty(result.status) ? Time.convert(result.total) : result.status}
      </p>
      <div className="flex items-center justify-center gap-4 md:gap-8">
        <ActivityResult icon={<SwimIcon />} label="Natation" time={Time.convert(result.swim)} />
        <ActivityResult icon={<BikeIcon />} label="Vélo" time={Time.convert(result.bike)} />
        <ActivityResult icon={<RunIcon />} label="Course à pied" time={Time.convert(result.run)} />
      </div>
    </Card>
  </Card>
);

export default ResultCard;
