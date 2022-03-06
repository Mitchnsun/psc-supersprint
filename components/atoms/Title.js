import React from 'react';
import { Typography } from '@mui/material';
import COLORS from '../../styles/colors';

const Title = ({ hLevel = 1, children }) => (
  <Typography 
    variant="h4"
    component={`h${hLevel}`}
    sx={{
      color: COLORS.WHITE,
      backgroundColor: COLORS.SECONDARY,
      padding: "10px 15px"
    }}
  >
    {children}
  </Typography>
);

export default Title;
