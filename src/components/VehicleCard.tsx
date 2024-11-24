import React from 'react';
import { Battery, Zap, Timer, Euro } from 'lucide-react';
import type { Vehicle } from '../data/vehicles';

interface VehicleCardProps {
  vehicle: Vehicle;
  isSelected: boolean;
  onSelect: (vehicle: Vehicle) => void;
}

export default function VehicleCard({ vehicle, isSelected, onSelect }: VehicleCardProps) {
  return (
    <div
      className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
        isSelected ? 'ring-2 ring-[#00915a] ring-offset-2' : ''
      }`}
      onClick={() => onSelect(vehicle)}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.name}`}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {vehicle.brand} {vehicle.name}
            </h3>
            <p className="text-sm text-gray-500">{vehicle.category}</p>
          </div>
          {vehicle.promotion && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              -{vehicle.promotion.discount}€
            </span>
          )}
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Battery className="h-4 w-4 mr-2 text-[#00915a]" />
            <span>{vehicle.specs.range}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Timer className="h-4 w-4 mr-2 text-[#00915a]" />
            <span>{vehicle.specs.acceleration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Zap className="h-4 w-4 mr-2 text-[#00915a]" />
            <span>{vehicle.specs.power}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-2xl font-bold text-[#00915a]">
            {vehicle.price.toLocaleString('es-ES')}€
          </div>
          {vehicle.monthlyPayment && (
            <div className="text-sm text-gray-600">
              Desde {vehicle.monthlyPayment.toLocaleString('es-ES')}€/mes*
            </div>
          )}
        </div>

        <button
          className={`mt-4 w-full px-4 py-2 rounded-full font-medium transition-colors ${
            isSelected
              ? 'bg-[#00915a] text-white'
              : 'bg-gray-100 text-gray-900 hover:bg-[#00915a] hover:text-white'
          }`}
        >
          {isSelected ? 'Vehículo seleccionado' : 'Seleccionar vehículo'}
        </button>
      </div>
    </div>
  );
}