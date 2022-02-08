import React from 'react';
import Link from 'next/link';
import Title from '../../components/atoms/Title';

const linkStyle = { marginRight: 15 };

export default function Results() {
  return (
    <React.Fragment>
      <Title hLevel={1}>Résultats 2019</Title>
      <div>
        <Link href="/results/2022" passHref>
          <button type="button" style={linkStyle}>
            2022
          </button>
        </Link>
        <Link href="/results/2019" passHref>
          <button type="button" style={linkStyle}>
            2019
          </button>
        </Link>
      </div>
      <p>No results publish yet</p>
      <style jsx>
        {`
          a {
            text-decoration: none;
            color: blue;
          }

          a:hover {
            opacity: 0.6;
          }
        `}
      </style>
    </React.Fragment>
  );
}
