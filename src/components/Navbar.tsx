import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80; // Height of fixed navbar
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img
                src="https://group.bnpparibas/uploads/logo/bnpp_2019.svg"
                alt="BNP Paribas"
                className="h-8"
              />
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <button onClick={() => scrollToSection('inicio')} className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-[#00915a]">
                Inicio
              </button>
              <button onClick={() => scrollToSection('vehiculos')} className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-[#00915a]">
                Vehículos
              </button>
              <button onClick={() => scrollToSection('simulador')} className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-[#00915a]">
                Simulador
              </button>
              <button onClick={() => scrollToSection('contacto')} className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-[#00915a]">
                Contacto
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <button className="p-2 rounded-full text-gray-600 hover:text-[#00915a]">
              <Search className="h-5 w-5" />
            </button>
            <button className="ml-4 px-4 py-2 rounded-md text-white bg-[#00915a] hover:bg-[#007a4d]">
              Área Cliente
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <button onClick={() => scrollToSection('inicio')} className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-[#00915a] hover:bg-gray-50">
            Inicio
          </button>
          <button onClick={() => scrollToSection('vehiculos')} className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-[#00915a] hover:bg-gray-50">
            Vehículos
          </button>
          <button onClick={() => scrollToSection('simulador')} className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-[#00915a] hover:bg-gray-50">
            Simulador
          </button>
          <button onClick={() => scrollToSection('contacto')} className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-[#00915a] hover:bg-gray-50">
            Contacto
          </button>
          <div className="pl-3 pr-4 py-2">
            <button className="w-full px-4 py-2 rounded-md text-white bg-[#00915a] hover:bg-[#007a4d]">
              Área Cliente
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}