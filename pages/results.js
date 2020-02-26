import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';

import MyLayout from '../components/Layout';

const linkStyle = {
  marginRight: 15
};

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

export default function Results() {
  const router = useRouter();
  const year = router.query.year || '2020';
  const { data, error } = useSWR('/api/results', fetcher);
  let msg = data?.msg;

  if (!data) msg = 'Loading...';
  if (error) msg = 'Failed to fetch the quote.';

  return (
    <MyLayout>
      <h1>Box scores</h1>
      <div>
        <Link href="/results?year=2020" as="/results/2020">
          <a style={linkStyle}>2020</a>
        </Link>
        <Link href="/results?year=2019" as="/results/2019">
          <a style={linkStyle}>2019</a>
        </Link>
      </div>
      <p>This is the results page for {year}</p>
      <p>{msg}</p>
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