import { PropsWithChildren, ElementType } from 'react';
import { Typography } from '@mui/material';
import COLORS from '@/styles/colors';

const Title = ({ hLevel = 'h1', children }: PropsWithChildren<{ hLevel: ElementType }>) => (
  <Typography
    variant="h4"
    component={hLevel}
    sx={{
      color: COLORS.WHITE,
      backgroundColor: COLORS.SECONDARY,
      fontFamily: 'FontBold',
      padding: '10px 15px',
    }}
  >
    {children}
  </Typography>
);

export default Title;
