import React from 'react';
import { Car, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-[#00915a]" />
            <span className="text-xl font-semibold text-[#00915a]">BNP Paribas Leasing</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#solutions" className="text-gray-600 hover:text-[#00915a] transition-colors">Soluciones</a>
            <a href="#calculator" className="text-gray-600 hover:text-[#00915a] transition-colors">Calculadora</a>
            <a href="#contact" className="text-gray-600 hover:text-[#00915a] transition-colors">Contacto</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <a href="#solutions" className="text-gray-600 hover:text-[#00915a] transition-colors">Soluciones</a>
              <a href="#calculator" className="text-gray-600 hover:text-[#00915a] transition-colors">Calculadora</a>
              <a href="#contact" className="text-gray-600 hover:text-[#00915a] transition-colors">Contacto</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}