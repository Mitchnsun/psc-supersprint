import React from 'react'
import useSWR from 'swr';

import ResultsTable from '../components/ResultsTable';
import Title from '../components/atoms/Title';

const linkStyle = {
  marginRight: 15
};

async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

export default function Results() {
  const { data, error } = useSWR(`/api/results?year=2020`, fetcher);
  const results = data?.results || [];

  return (
    <React.Fragment>
      <Title hLevel={1}>Résultats 2020</Title>
      <ResultsTable results={results} />
      <style jsx>{`
        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </React.Fragment>
  );
}