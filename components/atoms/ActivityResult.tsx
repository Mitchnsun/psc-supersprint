import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import COLORS from '../../styles/colors';

const StyledSpeed = styled('p')`
  font-size: 0.9rem;
  margin: 0.25rem;
  text-align: center;
`;

const StyledUnit = styled('span')`
  font-size: 0.8rem;
  padding-left: 2px;
  color: ${COLORS.GRAY_DARK};
`;

const StyledTime = styled('p')`
  display: inline-block;
  vertical-align: middle;
  margin: 0;
  padding: 0 0.5rem;
  color: ${COLORS.PURPLE};
  font-family: OpenSansBold;
  font-size: 1.3rem;
  font-weight: bold;
`;

const StyledIcon = styled('div')`
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
`;

const ActivityResult = ({
  icon,
  label,
  time,
  speed,
  unit,
}: {
  icon: JSX.Element;
  label: string;
  time: string;
  speed?: string;
  unit?: string;
}) => (
  <Grid item xs={6} md={2} aria-label={label}>
    <div style={{ textAlign: 'center' }}>
      <StyledIcon>{icon}</StyledIcon>
      <StyledTime>{time}</StyledTime>
    </div>
    {speed && (
      <StyledSpeed>
        {speed}
        <StyledUnit>{unit}</StyledUnit>
      </StyledSpeed>
    )}
  </Grid>
);

export default ActivityResult;
