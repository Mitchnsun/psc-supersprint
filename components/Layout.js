import React from 'react';
import { styled } from '@mui/material/styles';
import COLORS from '../styles/colors';
import Header from './Header';

const Container = styled('div')`
  margin: 0 1rem 1rem;
  padding: 20px;
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.SECONDARY};
`;

const Layout = ({ children }) => (
  <div style={{ margin: 'auto', maxWidth: 1080 }}>
    <Header />
    <Container>{children}</Container>
  </div>
);

export default Layout;
