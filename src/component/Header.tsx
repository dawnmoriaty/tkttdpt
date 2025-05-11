// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-[65px] bg-[#B6A7DB] border-b border-black/10 z-50 flex justify-center items-center">
      <div className="w-[1536px] flex justify-center items-center mx-auto">
        <img
          src="src\assets\img\logo.svg"
          alt="Logo"
          width={158}
          height={29}
          className="object-contain"
        />
      </div>
    </header>
  );
};

export default Header;
