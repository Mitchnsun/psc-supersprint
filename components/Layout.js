import React from 'react';
import COLORS from '../styles/colors';
import Header from './Header';

const layoutStyle = {
  margin: '0 1rem 1rem',
  padding: 20,
  backgroundColor: COLORS.WHITE,
  border: `1px solid ${COLORS.SECONDARY}`,
};

const containerStyle = {
  margin: 'auto',
  maxWidth: '1080px',
};

const Layout = ({ children }) => (
  <div style={containerStyle}>
    <Header />
    <div style={layoutStyle}>{children}</div>
  </div>
);

export default Layout;
