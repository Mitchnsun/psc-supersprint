import { ResultTypeWithId } from '@/utils/types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import COLORS from '@/styles/colors';
import isEmpty from 'lodash/isEmpty';
import Time from '@/utils/time';

const Podiums = ({ category, results }: { category: string; results: ResultTypeWithId[] }) => {
  const men = results.filter(({ cat, sex }) => (isEmpty(category) || category === cat) && sex === 'M');
  const women = results.filter(({ cat, sex }) => (isEmpty(category) || category === cat) && sex === 'F');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid size={6}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: COLORS.SECONDARY,
              fontFamily: 'FontBold',
            }}
          >
            Hommes
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: COLORS.SECONDARY,
              fontFamily: 'FontBold',
            }}
          >
            Femmes
          </Typography>
        </Grid>
        <Grid size={6}>
          {men.slice(0, 3).map((item, index) => (
            <Typography>
              {index + 1}. {item.firstname} {item.lastname} - {Time.convert(item.total)}
            </Typography>
          ))}
        </Grid>
        <Grid size={6}>
          {women.slice(0, 3).map((item, index) => (
            <Typography>
              {index + 1}. {item.firstname} {item.lastname} - {Time.convert(item.total)}
            </Typography>
          ))}
        </Grid>
        <Grid size={12}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              color: COLORS.SECONDARY,
              fontFamily: 'FontBold',
            }}
          >
            Natation
          </Typography>
        </Grid>
        <Grid size={6}>
          {men
            .sort((a, b) => a.swim - b.swim)
            .slice(0, 3)
            .map((item, index) => (
              <Typography>
                {index + 1}. {item.firstname} {item.lastname} - {Time.convert(item.swim)}
              </Typography>
            ))}
        </Grid>
        <Grid size={6}>
          {women
            .sort((a, b) => a.swim - b.swim)
            .slice(0, 3)
            .map((item, index) => (
              <Typography>
                {index + 1}. {item.firstname} {item.lastname} - {Time.convert(item.swim)}
              </Typography>
            ))}
        </Grid>
        <Grid size={12}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              color: COLORS.SECONDARY,
              fontFamily: 'FontBold',
            }}
          >
            Vélo
          </Typography>
        </Grid>
        <Grid size={6}>
          {men
            .sort((a, b) => a.bike - b.bike)
            .slice(0, 3)
            .map((item, index) => (
              <Typography>
                {index + 1}. {item.firstname} {item.lastname} - {Time.convert(item.bike)}
              </Typography>
            ))}
        </Grid>
        <Grid size={6}>
          {women
            .sort((a, b) => a.bike - b.bike)
            .slice(0, 3)
            .map((item, index) => (
              <Typography>
                {index + 1}. {item.firstname} {item.lastname} - {Time.convert(item.bike)}
              </Typography>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Podiums;
