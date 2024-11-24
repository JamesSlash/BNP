import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Euro, Calculator, Calendar, CreditCard } from 'lucide-react';
import { vehicles, calculateMonthlyPayment } from '../data/vehicles';

const schema = z.object({
  vehicleId: z.string().min(1, 'Por favor seleccione un vehículo'),
  financePercentage: z.coerce
    .number()
    .min(20, 'El porcentaje mínimo a financiar es 20%')
    .max(100, 'El porcentaje máximo a financiar es 100%'),
  term: z.coerce
    .number()
    .min(12, 'El plazo mínimo es 12 meses')
    .max(84, 'El plazo máximo es 84 meses'),
  income: z.coerce
    .number()
    .min(1000, 'Los ingresos mínimos son 1.000€'),
  employment: z.string().min(1, 'Seleccione su situación laboral'),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'El teléfono debe tener al menos 9 dígitos'),
  message: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Debe aceptar los términos y condiciones'
  })
});

export default function CreditSimulator() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 250000]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 6;

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      vehicleId: vehicles[0].id,
      financePercentage: 100,
      term: 48,
      employment: '',
      acceptTerms: false,
    },
  });

  const watchVehicleId = watch('vehicleId');
  const watchFinancePercentage = watch('financePercentage');

  useEffect(() => {
    const filtered = vehicles.filter(vehicle => {
      const matchesSearch = (
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchesPrice = vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
      return matchesSearch && matchesPrice;
    });
    setFilteredVehicles(filtered);
    setCurrentPage(1);
  }, [searchQuery, priceRange]);

  useEffect(() => {
    const vehicle = vehicles.find(v => v.id === watchVehicleId);
    if (vehicle) {
      setSelectedVehicle(vehicle);
      const amount = (vehicle.price * watchFinancePercentage) / 100;
      setValue('amount', amount);
    }
  }, [watchVehicleId, watchFinancePercentage, setValue]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const vehicle = vehicles.find(v => v.id === data.vehicleId);
      if (!vehicle) return;

      const amount = (vehicle.price * data.financePercentage) / 100;
      const payment = calculateMonthlyPayment(amount, data.term);

      const simulationData = {
        amount,
        term: parseInt(data.term),
        income: parseFloat(data.income),
        employment: data.employment,
        name: data.name,
        email: data.email,
        phone: data.phone,
        monthlyPayment: payment,
        vehicleId: vehicle.id,
      };

      console.log('Sending simulation data:', simulationData);

      const response = await fetch('http://localhost:3000/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(simulationData),
      });

      if (!response.ok) {
        throw new Error('Failed to save simulation');
      }

      console.log('Simulation saved successfully');

      setMonthlyPayment(payment);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la solicitud');
    } finally {
      setIsSubmitting(false);
    }
  };

  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = filteredVehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);
  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);

  const Pagination = () => (
    <div className="mt-6 flex justify-center gap-2">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Anterior
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-4 py-2 border rounded-md ${
            currentPage === i + 1 ? 'bg-[#00915a] text-white' : 'hover:bg-gray-50'
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Siguiente
      </button>
    </div>
  );

  return (
    <div className="bg-white py-24" id="simulador">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#00915a]">Simulador de Financiación</h2>
          <p className="mt-4 text-xl text-gray-600">
            Calcule su financiación personalizada en pocos pasos
          </p>
        </div>

        <div className="mt-12">
          {/* Vehicle Search and Filters */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Buscar vehículo</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Marca, modelo o categoría..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00915a] focus:ring-[#00915a]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Precio máximo: {priceRange[1].toLocaleString('es-ES')}€
                </label>
                <input
                  type="range"
                  min="0"
                  max="250000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="mt-2 w-full"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`relative bg-white rounded-lg border-2 p-4 cursor-pointer transition-all ${
                  watchVehicleId === vehicle.id
                    ? 'border-[#00915a] bg-green-50'
                    : 'border-gray-200 hover:border-[#00915a]'
                }`}
                onClick={() => setValue('vehicleId', vehicle.id)}
              >
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.name}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="text-lg font-semibold">
                  {vehicle.brand} {vehicle.name}
                </h4>
                <p className="text-sm text-gray-600">{vehicle.category}</p>
                <p className="text-2xl font-bold text-[#00915a] mt-2">
                  {vehicle.price.toLocaleString('es-ES')}€
                </p>
                <p className="text-sm text-gray-500 mt-1">{vehicle.description}</p>
              </div>
            ))}
          </div>

          {/* Add pagination */}
          <Pagination />

          {/* Financing Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Información de financiación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Porcentaje a financiar
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      {...register('financePercentage')}
                      className="block w-full rounded-md border-gray-300 focus:border-[#00915a] focus:ring-[#00915a]"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                  {errors.financePercentage && (
                    <p className="mt-1 text-sm text-red-600">{errors.financePercentage.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Plazo (meses)
                  </label>
                  <select
                    {...register('term')}
                    className="mt-1 block w-full rounded-md border-gray-300 focus:border-[#00915a] focus:ring-[#00915a]"
                  >
                    {[12, 24, 36, 48, 60, 72, 84].map((months) => (
                      <option key={months} value={months}>
                        {months} meses
                      </option>
                    ))}
                  </select>
                  {errors.term && (
                    <p className="mt-1 text-sm text-red-600">{errors.term.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Información personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className="mt-1 block w-full rounded-md border-gray-300 focus:border-[#00915a] focus:ring-[#00915a]"
                    placeholder="Ej: Juan Pérez"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="mt-1 block w-full rounded-md border-gray-300 focus:border-[#00915a] focus:ring-[#00915a]"
                    placeholder="ejemplo@correo.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="mt-1 block w-full rounded-md border-gray-300 focus:border-[#00915a] focus:ring-[#00915a]"
                    placeholder="Ej: 612345678"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Situación laboral
                  </label>
                  <select
                    {...register('employment')}
                    className="mt-1 block w-full rounded-md border-gray-300 focus:border-[#00915a] focus:ring-[#00915a]"
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="employed">Empleado</option>
                    <option value="self-employed">Autónomo</option>
                    <option value="retired">Jubilado</option>
                    <option value="other">Otro</option>
                  </select>
                  {errors.employment && (
                    <p className="mt-1 text-sm text-red-600">{errors.employment.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ingresos mensuales
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      {...register('income')}
                      className="block w-full rounded-md border-gray-300 focus:border-[#00915a] focus:ring-[#00915a]"
                      placeholder="2000"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">€</span>
                    </div>
                  </div>
                  {errors.income && (
                    <p className="mt-1 text-sm text-red-600">{errors.income.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Mensaje adicional (opcional)
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 focus:border-[#00915a] focus:ring-[#00915a]"
                    placeholder="Información adicional sobre su solicitud..."
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      {...register('acceptTerms')}
                      className="mt-1 h-4 w-4 text-[#00915a] focus:ring-[#00915a] border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-600">
                      Acepto la política de privacidad y el tratamiento de mis datos personales
                    </label>
                  </div>
                  {errors.acceptTerms && (
                    <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#00915a] text-white rounded-md hover:bg-[#007a4d] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Procesando...' : 'Calcular financiación'}
              </button>
            </div>
          </form>

          {/* Results */}
          {showResults && monthlyPayment && (
            <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold text-center mb-6">Resultado de la simulación</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-500">Cuota mensual</p>
                  <p className="text-3xl font-bold text-[#00915a]">
                    {monthlyPayment.toFixed(2)}€
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vehículo seleccionado</p>
                  <p className="text-xl font-semibold">
                    {selectedVehicle.brand} {selectedVehicle.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">TAE</p>
                  <p className="text-xl font-semibold">6.99%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}