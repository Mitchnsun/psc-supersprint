import Image from 'next/image';
import Bandeau from '../public/static/Bandeau_2022.jpg';

const Header = () => (
  <header>
    <Image
      src={Bandeau}
      width={1080}
      height={112}
      style={{ width: '100%', height: 'auto' }}
      alt="Bandeau Supersprint Paris 20ième 2022"
    />
  </header>
);

export default Header;