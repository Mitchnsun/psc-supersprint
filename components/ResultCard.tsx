import { Card } from '@/components/ui/card';
import { isEmpty } from '@/lib/utils';
import { ResultType } from '@/utils/types';
import Time from '@/utils/time';
import SwimIcon from './atoms/SwimIcon';
import BikeIcon from './atoms/BikeIcon';
import RunIcon from './atoms/RunIcon';
import ActivityResult from './atoms/ActivityResult';
import Title from './atoms/Title';

const ResultCard = ({ result }: { result: ResultType }) => (
  <Card className="text-center pb-8 rounded-none bg-primary border-secondary">
    <Title hLevel="h2">Finisher</Title>
    <Title hLevel="h3">
      {result.firstname} {result.lastname}
    </Title>
    <Card className="my-16 mx-8 p-4 bg-white border-0">
      <p className="m-0 p-2 text-5xl font-bold text-logo">
        {isEmpty(result.status) ? Time.convert(result.total) : result.status}
      </p>
      <div className="flex gap-4 md:gap-8 justify-center items-center">
        <ActivityResult icon={<SwimIcon />} label="Natation" time={Time.convert(result.swim)} />
        <ActivityResult icon={<BikeIcon />} label="Vélo" time={Time.convert(result.bike)} />
        <ActivityResult icon={<RunIcon />} label="Course à pied" time={Time.convert(result.run)} />
      </div>
    </Card>
  </Card>
);

export default ResultCard;
