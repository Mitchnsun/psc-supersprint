import Image from 'next/image';
import Bandeau from '@/public/static/Bandeau_2025.jpg';

const Header = () => (
  <header>
    <Image src={Bandeau} style={{ width: '100%', height: 'auto' }} alt="Bandeau Supersprint Paris 20ième 2025" />
  </header>
);

export default Header;
