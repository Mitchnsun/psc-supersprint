import useSWR from 'swr';
import Link from 'next/link';

import MyLayout from '../components/Layout';

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
    <MyLayout>
      <h1>Box scores</h1>
      <div>
        <Link href="/results/2020">
          <a style={linkStyle}>2020</a>
        </Link>
        <Link href="/results/2019">
          <a style={linkStyle}>2019</a>
        </Link>
      </div>
      <p>This is the results page for 2020</p>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>BIB</th><th>Cat.</th><th>Temps</th>
          </tr>
        </thead>
        <tbody>
          {results.map(item => (
            <tr>
              <td>{item.firstname} {item.lastname}</td>
              <td>{item.bib}</td>
              <td>{item.cat}{item.sex}</td>
              <td>{item.times?.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </MyLayout>
  );
}