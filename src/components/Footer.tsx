import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center">
              <img
                src="https://group.bnpparibas/uploads/logo/bnpp_2019_white.svg"
                alt="BNP Paribas"
                className="h-8"
              />
            </div>
            <p className="mt-4 text-gray-400">
              El banco para un mundo en movimiento
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold">Productos</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Préstamos Personales</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Hipotecas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Inversiones</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Seguros</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold">Empresa</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Sobre Nosotros</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Carreras</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Noticias</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Aviso Legal</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Política de Privacidad</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Cookies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Seguridad</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-center">
            © {new Date().getFullYear()} BNP Paribas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}