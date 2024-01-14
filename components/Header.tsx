import Image from 'next/image';
import Bandeau from '@/public/static/Bandeau_2024.jpg';

const Header = () => (
  <header>
    <Image src={Bandeau} style={{ width: '100%', height: 'auto' }} alt="Bandeau Supersprint Paris 20ième 2024" />
  </header>
);

export default Header;
