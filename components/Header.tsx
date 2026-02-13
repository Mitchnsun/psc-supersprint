import Image from 'next/image';

import Bandeau2026 from './Bandeau_2026';

const YEARS_WITH_IMAGE = [2022, 2023, 2024, 2025];

const Header = ({ year }: { year?: number }) => {
  const hasImageBandeau = year !== undefined && YEARS_WITH_IMAGE.includes(year);

  return (
    <header>
      {hasImageBandeau ? (
        <Image
          src={`/static/Bandeau_${year}.jpg`}
          alt={`Bandeau PSC Supersprint ${year}`}
          width={1200}
          height={300}
          className="h-auto w-full"
          priority
        />
      ) : (
        <Bandeau2026 />
      )}
    </header>
  );
};

export default Header;
