import isEmpty from 'lodash/isEmpty';
import { styled } from '@mui/material/styles';
import { Card, Grid } from '@mui/material';
import COLORS from '@/styles/colors';
import { ResultType } from '@/utils/types';
import Time from '@/utils/time';
import SwimIcon from './atoms/SwimIcon';
import BikeIcon from './atoms/BikeIcon';
import RunIcon from './atoms/RunIcon';
import ActivityResult from './atoms/ActivityResult';
import Title from './atoms/Title';

const StyledTotal = styled('p')`
  margin: 0;
  padding: 0 0.5rem;
  color: ${COLORS.LOGO};
  font-family: FontBold;
  font-size: 3rem;
  font-weight: bold;
`;

const ResultCard = ({ result }: { result: ResultType }) => (
  <Card
    variant="outlined"
    sx={{
      backgroundColor: 'primary.main',
      borderColor: 'secondary.main',
      textAlign: 'center',
      paddingBottom: 2,
      borderRadius: 0,
    }}
  >
    <Title hLevel="h2">Finisher</Title>
    <Title hLevel="h3">
      {result.firstname} {result.lastname}
    </Title>
    <Card sx={{ margin: '4rem 2rem', padding: 1 }}>
      <StyledTotal>{isEmpty(result.status) ? Time.convert(result.total) : result.status}</StyledTotal>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <ActivityResult icon={<SwimIcon />} label="Natation" time={Time.convert(result.swim)} />
        <ActivityResult icon={<BikeIcon />} label="Vélo" time={Time.convert(result.bike)} />
        <ActivityResult icon={<RunIcon />} label="Course à pied" time={Time.convert(result.run)} />
      </Grid>
    </Card>
  </Card>
);

export default ResultCard;
