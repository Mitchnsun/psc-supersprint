'use client';

import { PropsWithChildren } from 'react';
import { styled } from '@mui/material/styles';
import COLORS from '@/styles/colors';
import Header from './Header';

const Wrapper = styled('div')`
  margin: auto;
  max-width: 1080px;
`;

const Container = styled('div')`
  margin: 0 1rem 1rem;
  padding: 20px;
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.SECONDARY};
`;

const Layout = ({ children }: PropsWithChildren<unknown>) => (
  <Wrapper>
    <Header />
    <Container>{children}</Container>
  </Wrapper>
);

export default Layout;
