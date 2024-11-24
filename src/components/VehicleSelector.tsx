import React from 'react';
import { Car } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useVehicleImage } from '@/utils/imageUtils';

const vehicles = [
  {
    id: 'tesla-model3',
    name: 'Tesla Model 3',
    price: 44990,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80',
    specs: {
      range: '491 km',
      acceleration: '3.3s 0-100 km/h',
      power: '513 CV',
    }
  },
  {
    id: 'bmw-ix',
    name: 'BMW iX',
    price: 77300,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80',
    specs: {
      range: '630 km',
      acceleration: '4.6s 0-100 km/h',
      power: '523 CV',
    }
  },
  {
    id: 'mercedes-eqs',
    name: 'Mercedes EQS',
    price: 89900,
    image: 'https://images.unsplash.com/photo-1633695247807-4bb7c2c37769?auto=format&fit=crop&q=80',
    specs: {
      range: '780 km',
      acceleration: '3.8s 0-100 km/h',
      power: '658 CV',
    }
  },
];

interface VehicleSelectorProps {
  onSelect: (vehicleId: string, price: number) => void;
  selectedVehicleId: string | null;
}

export default function VehicleSelector({ onSelect, selectedVehicleId }: VehicleSelectorProps) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Seleccione un vehículo para financiar
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
              selectedVehicleId === vehicle.id
                ? 'border-[#00915a] bg-green-50'
                : 'border-gray-200 hover:border-[#00915a] hover:bg-green-50'
            }`}
            onClick={() => onSelect(vehicle.id, vehicle.price)}
          >
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src={useVehicleImage(vehicle)}
                alt={vehicle.name}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">{vehicle.name}</h4>
            <p className="text-2xl font-bold text-[#00915a] mt-2">
              {vehicle.price.toLocaleString('es-ES')}€
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Car className="h-4 w-4 mr-2" />
                <span>{vehicle.specs.range}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Car className="h-4 w-4 mr-2" />
                <span>{vehicle.specs.acceleration}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Car className="h-4 w-4 mr-2" />
                <span>{vehicle.specs.power}</span>
              </div>
            </div>
            {selectedVehicleId === vehicle.id && (
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Seleccionado
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}