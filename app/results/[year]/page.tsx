import { redirect } from 'next/navigation';

type PageProps = {
  params: Promise<{
    year: string;
  }>;
};

export default async function ResultsPage({ params }: PageProps) {
  const { year } = await params;
  redirect(`/resultats/${year}`);
}
