import isEmpty from 'lodash/isEmpty';
import { Card } from '@/components/ui/card';
import COLORS from '@/styles/colors';
import { ResultType } from '@/utils/types';
import Time from '@/utils/time';
import SwimIcon from './atoms/SwimIcon';
import BikeIcon from './atoms/BikeIcon';
import RunIcon from './atoms/RunIcon';
import ActivityResult from './atoms/ActivityResult';
import Title from './atoms/Title';

const ResultCard = ({ result }: { result: ResultType }) => (
  <Card
    className="text-center pb-8 rounded-none"
    style={{
      backgroundColor: COLORS.PRIMARY,
      borderColor: COLORS.SECONDARY,
    }}
  >
    <Title hLevel="h2">Finisher</Title>
    <Title hLevel="h3">
      {result.firstname} {result.lastname}
    </Title>
    <Card className="my-16 mx-8 p-4">
      <p
        className="m-0 px-2 text-5xl font-bold"
        style={{
          color: COLORS.LOGO,
          fontFamily: 'FontBold',
        }}
      >
        {isEmpty(result.status) ? Time.convert(result.total) : result.status}
      </p>
      <div className="grid grid-cols-12 gap-2 justify-center items-center">
        <ActivityResult icon={<SwimIcon />} label="Natation" time={Time.convert(result.swim)} />
        <ActivityResult icon={<BikeIcon />} label="Vélo" time={Time.convert(result.bike)} />
        <ActivityResult icon={<RunIcon />} label="Course à pied" time={Time.convert(result.run)} />
      </div>
    </Card>
  </Card>
);

export default ResultCard;
