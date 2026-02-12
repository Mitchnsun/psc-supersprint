import Link from 'next/link';
import Title from '@/components/atoms/Title';

export default function NotFound() {
  return (
    <>
      <Title hLevel="h1">Page non trouvée</Title>
      <p className="mt-4">
        Vous êtes hors parcours,{' '}
        <Link href="/" className="text-blue-600 underline hover:text-blue-800">
          retourner à l&apos;accueil
        </Link>
      </p>
    </>
  );
}
