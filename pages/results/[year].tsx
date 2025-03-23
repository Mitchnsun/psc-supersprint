const ResultsPage = () => null;

export default ResultsPage;

export async function getServerSideProps({
  params,
}: {
  params: { year: string };
}): Promise<{ redirect: { destination: string; permanent: boolean } }> {
  const { year } = params;

  return {
    redirect: {
      destination: `/resultats/${year}`,
      permanent: true,
    },
  };
}
