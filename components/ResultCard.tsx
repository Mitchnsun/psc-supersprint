import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { Card, Grid } from '@mui/material';
import { ResultType } from '../utils/types';
import Time from '../utils/time';
import COLORS from '../styles/colors';
import Bandeau from '../public/static/Bandeau_2022.jpg';
import SwimIcon from './atoms/SwimIcon';
import BikeIcon from './atoms/BikeIcon';
import RunIcon from './atoms/RunIcon';
import ActivityResult from './atoms/ActivityResult';
import Title from './atoms/Title';

const StyledTotal = styled('p')`
  margin: 0;
  padding: 0 0.5rem;
  color: ${COLORS.PURPLE};
  font-family: OpenSansBold;
  font-size: 3rem;
  font-weight: bold;
`;

const ResultCard = ({ result }: { result: ResultType }) => (
  <Card
    variant="outlined"
    sx={{
      backgroundColor: 'primary.main',
      borderColor: 'secondary.main',
      maxWidth: '40%',
      textAlign: 'center',
      paddingBottom: 2,
    }}
  >
    <Title hLevel="h2">Finisher</Title>
    <Title hLevel="h3">
      {result.firstname} {result.lastname}
    </Title>
    <Card sx={{ margin: 3, padding: 1 }}>
      <StyledTotal>{Time.convert(result.total)}</StyledTotal>
      <Grid container justifyContent="center" alignItems="center">
        <ActivityResult icon={<SwimIcon />} label="Natation" time={Time.convert(result.swim)} />
        <ActivityResult icon={<BikeIcon />} label="Vélo" time={Time.convert(result.bike)} />
        <ActivityResult icon={<RunIcon />} label="Course à pied" time={Time.convert(result.run)} />
      </Grid>
    </Card>
    <Image
      src={Bandeau}
      width={1080}
      height={112}
      style={{ width: '100%', height: 'auto' }}
      alt="Bandeau Supersprint Paris 20ième 2022"
    />
  </Card>
);

export default ResultCard;
