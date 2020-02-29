import React from 'react';
import COLORS from '../../styles/colors';

const Title = ({ hLevel, children }) => {
  const HtmlTag = hLevel ? `h${hLevel}` : 'h1';
  return (
    <React.Fragment>
      <HtmlTag>
        {children}
      </HtmlTag>
      <style jsx>{`
        h1, h2, h3, h4 {
          color: ${COLORS.WHITE};
          background-color: ${COLORS.SECONDARY};
          margin: 0;
          padding: 10px 15px;
        }
      `}</style>
    </React.Fragment>
  )
};

export default Title;