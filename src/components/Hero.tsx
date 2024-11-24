import React from 'react';

export default function Hero() {
  const scrollToSimulator = () => {
    const simulator = document.getElementById('simulador');
    if (simulator) {
      const navbarHeight = 80;
      const elementPosition = simulator.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative bg-white pt-20">
      <div className="absolute inset-0 h-[600px]">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80"
          alt="BNP Paribas oficina"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-64">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Soluciones financieras para tu futuro
          </h1>
          <p className="mt-6 text-xl text-gray-300">
            Descubre nuestros préstamos personales con las mejores condiciones del mercado y haz realidad tus proyectos.
          </p>
          <div className="mt-10 flex gap-4">
            <button 
              onClick={scrollToSimulator}
              className="px-8 py-3 rounded-md bg-[#00915a] text-white font-medium hover:bg-[#007a4d] transition-colors"
            >
              Simular Préstamo
            </button>
            <button 
              onClick={() => document.getElementById('vehiculos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 rounded-md bg-white text-[#00915a] font-medium hover:bg-gray-100 transition-colors"
            >
              Ver Vehículos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}