import { useEffect, useState } from 'react';
import { Vehicle } from '@/types';
import { getRandomFeaturedVehicles } from '@/utils/vehicleUtils';
import VehicleCard from './VehicleCard';

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
}

export default function FeaturedVehicles({ vehicles }: FeaturedVehiclesProps) {
  const [featured, setFeatured] = useState<Vehicle[]>([]);

  useEffect(() => {
    setFeatured(getRandomFeaturedVehicles(vehicles));
  }, [vehicles]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Vehículos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
