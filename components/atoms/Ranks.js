import React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import RankIcon from './RankIcon';
import COLORS from '../../styles/colors';

const StyledTotal = styled('span')`
  font-size: 0.8rem;
  color: ${COLORS.GRAY_DARK};
`;
const StyledRank = styled('p')`
  font-size: 0.9rem;
  margin: 0 0.75rem;
`;

const Ranks = ({ ranks, cat, gender, totals = {} }) => (
  <Grid container item xs={6} md={3} justifyContent="center" alignItems="center">
    <Grid item style={{ width: 30, height: 30 }}>
      <RankIcon />
    </Grid>
    <Grid item style={{ textAlign: 'left' }}>
      <StyledRank>
        {`Scratch: ${ranks.scratch}`}
        <StyledTotal>{`/${totals.overall}`}</StyledTotal>
      </StyledRank>
      <StyledRank>
        {`Cat. ${cat}${gender}: ${ranks.cat}`}
        <StyledTotal>{`/${totals[cat + gender]}`}</StyledTotal>
      </StyledRank>
      <StyledRank>
        {`${gender}: ${ranks.gender}`}
        <StyledTotal>{`/${totals[gender]}`}</StyledTotal>
      </StyledRank>
    </Grid>
  </Grid>
);

export default Ranks;
