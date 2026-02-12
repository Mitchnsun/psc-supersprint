import Image from 'next/image';
import Bandeau from '@/public/static/Bandeau_2025.jpg';

const Header = () => (
  <header>
    <Image className="w-full h-auto" src={Bandeau} alt="Bandeau Supersprint Paris 20ième 2025" />
  </header>
);

export default Header;
