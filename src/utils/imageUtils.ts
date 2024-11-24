import { Vehicle } from '@/types';

const ACCESS_KEY = 'tGhaLxhbFr3DbBKE6g4oUSQO1L8zTrzaNO7_YTSI8_8';
const baseUrl = 'https://api.unsplash.com/search/photos';

export async function getVehicleImage(brand: string): Promise<string> {
  const query = brand ? `${brand},car,vehicle,automotive,luxury` : 'car,vehicle,automotive,luxury';
  const url = `${baseUrl}?query=${encodeURIComponent(query)}&per_page=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching image from Unsplash API');
    }

    const data = await response.json();
    return data.results.length > 0 
      ? data.results[0].urls.regular 
      : 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&w=800&q=80';
  } catch (error) {
    console.error('Error fetching vehicle image:', error);
    return 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&w=800&q=80';
  }
}

export function useVehicleImage(vehicle: Vehicle): string {
  const [imageUrl, setImageUrl] = useState<string>('https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&w=800&q=80');

  useEffect(() => {
    getVehicleImage(vehicle.brand)
      .then(url => setImageUrl(url))
      .catch(() => setImageUrl('https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&w=800&q=80'));
  }, [vehicle.brand]);

  return imageUrl;
}
