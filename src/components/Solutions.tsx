import React from 'react';
import { Truck, Building2, Users, Leaf } from 'lucide-react';

export default function Solutions() {
  const solutions = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Vehículos Comerciales",
      description: "Financiación flexible para furgonetas, camiones y remolques adaptada a tus necesidades empresariales."
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Soluciones para Fabricantes",
      description: "Optimiza tu red de concesionarios y mejora la eficiencia de las entregas con nuestras opciones de financiación."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Concesionarios",
      description: "Ofrece a tus clientes soluciones de pago flexibles y personalizadas para impulsar tus ventas."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Movilidad Sostenible",
      description: "Apuesta por el futuro con nuestras soluciones de financiación para vehículos ecológicos."
    }
  ];

  return (
    <section id="solutions" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Nuestras Soluciones
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-[#00915a] mb-4">
                {solution.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {solution.title}
              </h3>
              <p className="text-gray-600">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}