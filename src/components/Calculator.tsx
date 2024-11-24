import React, { useState } from 'react';
import { Calculator as CalcIcon, Car, Truck, Bus, Info } from 'lucide-react';
import { VehicleType, LeasingFormData } from '../types';

const vehicleTypes: VehicleType[] = [
  {
    id: 'car',
    name: 'Turismo',
    minPrice: 5000,
    maxPrice: 100000,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'van',
    name: 'Furgoneta',
    minPrice: 15000,
    maxPrice: 120000,
    image: 'https://images.unsplash.com/photo-1578500351865-d6c3706f46bc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'truck',
    name: 'Camión',
    minPrice: 50000,
    maxPrice: 150000,
    image: 'https://images.unsplash.com/photo-1586191582151-f73872dfd183?auto=format&fit=crop&q=80&w=1000',
  },
];

export default function Calculator() {
  const [formData, setFormData] = useState<LeasingFormData>({
    amount: 30000,
    term: 36,
    downPayment: 20,
    vehicleType: 'car',
  });

  const [showInfo, setShowInfo] = useState(false);

  const selectedVehicle = vehicleTypes.find(v => v.id === formData.vehicleType)!;

  const monthlyPayment = calculateMonthlyPayment(formData);
  const totalCost = monthlyPayment * formData.term;
  const totalInterest = totalCost - (formData.amount * (1 - formData.downPayment / 100));

  function calculateMonthlyPayment(data: LeasingFormData) {
    const principal = data.amount * (1 - data.downPayment / 100);
    const interestRate = 0.0499 / 12;
    const payments = data.term;
    
    const monthlyPayment = (principal * interestRate * Math.pow(1 + interestRate, payments)) / 
                          (Math.pow(1 + interestRate, payments) - 1);
    
    return Number(monthlyPayment.toFixed(2));
  }

  const handleChange = (field: keyof LeasingFormData, value: number | string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section id="calculator" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <CalcIcon className="w-8 h-8 text-[#00915a] mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">Calculadora de Leasing</h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {vehicleTypes.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => handleChange('vehicleType', vehicle.id)}
                className={`relative overflow-hidden rounded-xl ${
                  formData.vehicleType === vehicle.id 
                    ? 'ring-2 ring-[#00915a]' 
                    : 'hover:ring-2 hover:ring-gray-200'
                }`}
              >
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white font-semibold">{vehicle.name}</p>
                  <p className="text-gray-200 text-sm">
                    €{vehicle.minPrice.toLocaleString()} - €{vehicle.maxPrice.toLocaleString()}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor del vehículo: €{formData.amount.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min={selectedVehicle.minPrice}
                    max={selectedVehicle.maxPrice}
                    step="1000"
                    value={formData.amount}
                    onChange={(e) => handleChange('amount', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plazo (meses): {formData.term}
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="84"
                    step="12"
                    value={formData.term}
                    onChange={(e) => handleChange('term', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entrada (%): {formData.downPayment}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={formData.downPayment}
                    onChange={(e) => handleChange('downPayment', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cuota mensual</span>
                      <span className="text-2xl font-bold text-[#00915a]">
                        €{monthlyPayment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Coste total</span>
                      <span className="font-semibold">€{totalCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Intereses totales</span>
                      <span className="font-semibold">€{totalInterest.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setShowInfo(!showInfo)}
                      className="text-sm text-gray-500 flex items-center hover:text-[#00915a]"
                    >
                      <Info className="w-4 h-4 mr-1" />
                      Ver detalles del cálculo
                    </button>
                    
                    {showInfo && (
                      <div className="mt-2 text-sm text-gray-500">
                        <p>TAE: 4.99%</p>
                        <p>Comisión de apertura: 1%</p>
                        <p>Seguro incluido en la cuota</p>
                      </div>
                    )}
                  </div>
                </div>

                <button className="w-full bg-[#00915a] text-white py-4 rounded-lg font-semibold hover:bg-[#007a4d] transition-colors flex items-center justify-center space-x-2">
                  <span>Solicitar financiación</span>
                  <Car className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}