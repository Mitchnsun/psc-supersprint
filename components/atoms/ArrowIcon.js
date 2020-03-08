import React from 'react';
import COLORS from '../../styles/colors';

const ArrowIcon = ({ down }) => (
  <button type="button" aria-disabled="false" aria-label="Détails des résultats" aria-expanded={down}>
    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
    <style jsx>
      {`
        button {
          margin: 0;
          padding: 0;
          border: 0;
          background: none;
          width: 20px;
          height: 20px;
          transform: rotate(${down ? 0 : '-90deg'});
          transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }
        svg {
          fill: ${COLORS.GRAY_DARK};
        }
      `}
    </style>
  </button>
);

export default ArrowIcon;
