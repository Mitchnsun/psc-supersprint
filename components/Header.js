import React from 'react';
import Image from 'next/image';

const Header = () => (
  <header>
    <Image src="/static/Bandeau_2022.jpg" width={1080} height={112} alt="Bandeau Supersprint Paris 20ième 2022" />
    <style jsx>
      {`
        img {
          width: 100%;
        }
      `}
    </style>
  </header>
);

export default Header;
