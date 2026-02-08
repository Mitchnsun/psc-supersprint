import { redirect } from 'next/navigation';

type PageProps = {
  params: {
    year: string;
  };
};

export default function ResultsPage({ params }: PageProps) {
  const { year } = params;
  redirect(`/resultats/${year}`);
}
