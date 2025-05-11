import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className="bg-headerbackground w-full h-full flex justify-center items-center ">
      <Link to="/" className="flex items-center">
        <img
          src="/src/assets/img/logo.svg"
          alt="Logo"
          width={158}
          height={29}
          className="object-contain"
        />
      </Link>
    </div>
  );
};

export default Header;