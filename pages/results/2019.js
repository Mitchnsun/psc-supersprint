import Link from 'next/link';

import MyLayout from '../../components/Layout';

const linkStyle = {
  marginRight: 15
};

export default function Results() {
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
      <p>This is the results page for 2019</p>
      <p>No results publish yet</p>
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