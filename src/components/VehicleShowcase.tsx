import { useState, useMemo } from 'react';
import { Vehicle } from '@/types';
import { vehicles } from '@/data/vehicles';

export default function VehicleShowcase() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [priceRange, setPriceRange] = useState(250000);

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter(vehicle => {
        const matchesSearch = 
          vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'Todos' || vehicle.type === selectedType;
        const matchesCategory = selectedCategory === 'Todos' || vehicle.category === selectedCategory;
        const matchesPrice = vehicle.price <= priceRange;
        
        return matchesSearch && matchesType && matchesCategory && matchesPrice;
      })
      .slice(0, 6);
  }, [searchQuery, selectedType, selectedCategory, priceRange]);

  const types = ['Todos', 'EV', 'Hybrid', 'Plug-in Hybrid', 'Gasoline'];
  const categories = ['Todos', 'SUV Eléctrico', 'Sedán Eléctrico', 'SUV', 'Sedán', 'Hatchback'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Filters Section */}
      <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Buscar</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Marca o modelo..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00915a] focus:ring-[#00915a]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00915a] focus:ring-[#00915a]"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00915a] focus:ring-[#00915a]"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Precio máximo: {priceRange.toLocaleString('es-ES')}€
            </label>
            <input
              type="range"
              min="10000"
              max="250000"
              step="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => setSelectedVehicle(vehicle)}
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={useVehicleImage(vehicle)}
                alt={`${vehicle.brand} ${vehicle.name}`}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                {vehicle.brand} {vehicle.name}
              </h3>
              <p className="text-gray-600">{vehicle.category}</p>
              <p className="text-[#00915a] font-bold mt-2">
                {vehicle.price.toLocaleString('es-ES')} €
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Finance Calculator Section */}
      {selectedVehicle && (
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Calcular Financiación para {selectedVehicle.brand} {selectedVehicle.name}
          </h3>
          {/* Rest of the finance calculator component */}
        </div>
      )}
    </div>
  );
}