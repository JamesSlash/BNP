import React from 'react';
import { Calculator, Clock, Shield, PiggyBank } from 'lucide-react';

const features = [
  {
    name: 'Simulador Online',
    description: 'Calcula tu préstamo al instante y conoce las cuotas mensuales.',
    icon: Calculator,
  },
  {
    name: 'Respuesta Rápida',
    description: 'Obtén una respuesta a tu solicitud en menos de 24 horas.',
    icon: Clock,
  },
  {
    name: 'Máxima Seguridad',
    description: 'Tus datos están protegidos con los más altos estándares.',
    icon: Shield,
  },
  {
    name: 'Mejores Condiciones',
    description: 'Tipos de interés competitivos y plazos flexibles.',
    icon: PiggyBank,
  },
];

export default function Features() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            ¿Por qué elegirnos?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Descubre las ventajas de confiar en BNP Paribas para tu préstamo personal
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-[#00915a] text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}