import { z } from 'zod';

export const vehicleSchema = z.object({
  id: z.string(),
  brand: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  type: z.string(),
  image: z.string(),
  specs: z.object({
    power: z.string(),
    range: z.string().optional(),
    acceleration: z.string().optional(),
    consumption: z.string().optional(),
    electricRange: z.string().optional(),
    topSpeed: z.string().optional()
  }),
  features: z.array(z.string()),
  available: z.boolean()
});

export type Vehicle = z.infer<typeof vehicleSchema>;

// Helper function to generate consistent IDs
function generateId(brand: string, name: string): string {
  return `${brand.toLowerCase()}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

// Helper function to get vehicle images (using a consistent car placeholder)
function getVehicleImage(brand?: string): string {
  // Construct a detailed query string with multiple automotive-related keywords
  const keywords = brand
    ? `${brand.replace(/\s+/g, '+')},car,vehicle,automotive,luxury,modern`
    : 'car,vehicle,automotive,luxury,modern';
  
  return `https://source.unsplash.com/800x600/?${encodeURIComponent(keywords)}`;
}


export const vehicles: Vehicle[] = [
  {
    id: generateId('Audi', 'Q6 e-tron'),
    brand: 'Audi',
    name: 'Q6 e-tron',
    price: 70000,
    description: 'SUV eléctrico de lujo con tecnología avanzada y amplio espacio interior.',
    category: 'SUV Eléctrico',
    type: 'EV',
    image: getVehicleImage('Audi'),
    specs: {
      power: '380 CV',
      range: '600 km',
      acceleration: '5.9s 0-100 km/h',
      consumption: '17.4 kWh/100 km'
    },
    features: ['Tracción Quattro', 'MMI Navigation plus', 'Audi virtual cockpit'],
    available: true
  },
  {
    id: generateId('BMW', 'i4 (facelift)'),
    brand: 'BMW',
    name: 'i4 (facelift)',
    price: 55000,
    description: 'Sedán eléctrico deportivo con mejoras en diseño y rendimiento.',
    category: 'Sedán Eléctrico',
    type: 'EV',
    image: getVehicleImage('BMW'),
    specs: {
      power: '340 CV',
      range: '590 km',
      acceleration: '5.7s 0-100 km/h',
      consumption: '16.5 kWh/100 km'
    },
    features: ['BMW iDrive 8.0', 'Head-Up Display', 'Asistente personal inteligente'],
    available: true
  },
  {
    id: generateId('Chevrolet', 'Equinox EV'),
    brand: 'Chevrolet',
    name: 'Equinox EV',
    price: 30000,
    description: 'SUV compacto eléctrico con autonomía competitiva y características modernas.',
    category: 'SUV Eléctrico',
    type: 'EV',
    image: getVehicleImage('Chevrolet'),
    specs: {
      power: '200 CV',
      range: '400 km',
      acceleration: '8.5s 0-100 km/h',
      consumption: '18.0 kWh/100 km'
    },
    features: ['Pantalla táctil de 10 pulgadas', 'Conectividad Apple CarPlay y Android Auto', 'Asistentes de seguridad'],
    available: true
  },
  {
    id: generateId('Citroën', 'ë-C3'),
    brand: 'Citroën',
    name: 'ë-C3',
    price: 25000,
    description: 'Hatchback eléctrico urbano con diseño distintivo y eficiencia energética.',
    category: 'Hatchback Eléctrico',
    type: 'EV',
    image: getVehicleImage('Citroën'),
    specs: {
      power: '136 CV',
      range: '320 km',
      acceleration: '9.7s 0-100 km/h',
      consumption: '15.0 kWh/100 km'
    },
    features: ['Suspensión Progressive Hydraulic Cushions', 'Conectividad Mirror Screen', 'Asistentes de conducción'],
    available: true
  },
  {
    id: generateId('Cupra', 'Tavascan'),
    brand: 'Cupra',
    name: 'Tavascan',
    price: 50000,
    description: 'SUV coupé eléctrico con enfoque deportivo y tecnología de vanguardia.',
    category: 'SUV Eléctrico',
    type: 'EV',
    image: getVehicleImage('Cupra'),
    specs: {
      power: '306 CV',
      range: '450 km',
      acceleration: '6.5s 0-100 km/h',
      consumption: '20.0 kWh/100 km'
    },
    features: ['Pantalla central de 13 pulgadas', 'Iluminación ambiental', 'Asistentes de seguridad avanzados'],
    available: true
  },
  {
    id: generateId('Dacia', 'Sandero'),
    brand: 'Dacia',
    name: 'Sandero',
    price: 15000,
    description: 'Hatchback económico con características básicas y eficiencia en combustible.',
    category: 'Hatchback',
    type: 'Gasoline',
    image: getVehicleImage('Dacia'),
    specs: {
      power: '90 CV',
      consumption: '5.2 L/100 km'
    },
    features: ['Sistema multimedia con pantalla táctil', 'Aire acondicionado', 'Asistencia de frenado de emergencia'],
    available: true
  },
  {
    id: generateId('Fiat', 'Fastback'),
    brand: 'Fiat',
    name: 'Fastback',
    price: 20000,
    description: 'Crossover compacto con diseño elegante y características urbanas.',
    category: 'Crossover',
    type: 'Gasoline',
    image: getVehicleImage('Fiat'),
    specs: {
      power: '130 CV',
      consumption: '6.5 L/100 km'
    },
    features: ['Sistema Uconnect', 'Sensores de aparcamiento', 'Control de crucero'],
    available: true
  },
  {
    id: generateId('Ford', 'Mustang Mach-E'),
    brand: 'Ford',
    name: 'Mustang Mach-E',
    price: 45000,
    description: 'SUV eléctrico inspirado en el icónico Mustang, con alto rendimiento.',
    category: 'SUV Eléctrico',
    type: 'EV',
    image: getVehicleImage(),
    specs: {
      power: '258 CV',
      range: '440 km',
      acceleration: '6.1s 0-100 km/h',
      consumption: '19.5 kWh/100 km'
    },
    features: ['Sync 4A', 'Asistentes de conducción Ford Co-Pilot360', 'Carga rápida DC'],
    available: true
  },
  {
    id: generateId('Mitsubishi', 'Outlander PHEV'),
    brand: 'Mitsubishi',
    name: 'Outlander PHEV',
    price: 40000,
    description: 'SUV híbrido enchufable con autonomía extendida y espacio familiar.',
    category: 'SUV Híbrido Enchufable',
    type: 'Plug-in Hybrid',
    image: getVehicleImage(),
    specs: {
      power: '221 CV',
      electricRange: '45 km',
      consumption: '1.5 L/100 km (híbrido)'
    },
    features: ['Modo de conducción eléctrica', 'Sistema de navegación integrado', 'Asientos calefactados'],
    available: true
  },
  {
    id: generateId('Nissan', 'Micra'),
    brand: 'Nissan',
    name: 'Micra',
    price: 17000,
    description: 'Hatchback subcompacto con diseño moderno y eficiencia en combustible.',
    category: 'Hatchback',
    type: 'Gasoline',
    image: getVehicleImage(),
    specs: {
      power: '117 CV',
      consumption: '5.4 L/100 km'
    },
    features: ['Sistema de infoentretenimiento con pantalla táctil', 'Aire acondicionado', 'Control de estabilidad'],
    available: true
  },
  {
    id: generateId('Opel', 'Corsa'),
    brand: 'Opel',
    name: 'Corsa',
    price: 20000,
    description: 'Hatchback compacto con características tecnológicas y eficiencia.',
    category: 'Hatchback',
    type: 'Gasoline',
    image: getVehicleImage(),
    specs: {
      power: '130 CV',
      consumption: '5.8 L/100 km'
    },
    features: ['Pantalla táctil de 7 pulgadas', 'Conectividad Bluetooth', 'Sensores de aparcamiento'],
    available: true
  },
  {
    id: generateId('Skoda', 'Kamiq'),
    brand: 'Skoda',
    name: 'Kamiq',
    price: 23000,
    description: 'SUV compacto con amplio espacio interior y características de seguridad.',
    category: 'SUV',
    type: 'Gasoline',
    image: getVehicleImage(),
    specs: {
      power: '110 CV',
      consumption: '5.9 L/100 km'
    },
    features: ['Sistema de infoentretenimiento con Apple CarPlay', 'Asistencia en mantenimiento de carril', 'Faros LED'],
    available: true
  },
  {
    id: generateId('Volkswagen', 'Golf'),
    brand: 'Volkswagen',
    name: 'Golf',
    price: 23000,
    description: 'Hatchback compacto icónico con rendimiento equilibrado y tecnología.',
    category: 'Hatchback',
    type: 'Gasoline',
    image: getVehicleImage(),
    specs: {
      power: '150 CV',
      consumption: '5.6 L/100 km'
    },
    features: ['Sistema de infoentretenimiento con pantalla táctil', 'Conectividad Apple CarPlay y Android Auto', 'Sensores de aparcamiento'],
    available: true
  },
  {
    id: generateId('Volvo', 'XC40 Recharge'),
    brand: 'Volvo',
    name: 'XC40 Recharge',
    price: 55000,
    description: 'SUV eléctrico compacto con enfoque en seguridad y sostenibilidad.',
    category: 'SUV Eléctrico',
    type: 'EV',
    image: getVehicleImage(),
    specs: {
      power: '408 CV',
      range: '418 km',
      acceleration: '4.9s 0-100 km/h',
      consumption: '17.8 kWh/100 km'
    },
    features: ['Sistema de infoentretenimiento Sensus', 'Pilot Assist', 'Asientos de cuero ecológicos'],
    available: true
  },
  {
    id: generateId('Peugeot', '3008'),
    brand: 'Peugeot',
    name: '3008',
    price: 32000,
    description: 'SUV compacto con diseño elegante y opciones híbridas.',
    category: 'SUV Híbrido',
    type: 'Hybrid',
    image: getVehicleImage(),
    specs: {
      power: '180 CV',
      consumption: '4.5 L/100 km'
    },
    features: ['Sistema i-Cockpit', 'Asistentes de conducción', 'Interiores de alta calidad'],
    available: true
  },
  {
    id: generateId('Renault', 'Arkana'),
    brand: 'Renault',
    name: 'Arkana',
    price: 28000,
    description: 'SUV coupé con diseño atractivo y eficiencia en combustible.',
    category: 'SUV',
    type: 'Gasoline',
    image: getVehicleImage(),
    specs: {
      power: '140 CV',
      consumption: '5.8 L/100 km'
    },
    features: ['Pantalla táctil de 8 pulgadas', 'Conectividad Bluetooth', 'Asistentes de conducción'],
    available: true
  },
  {
    id: generateId('Seat', 'Tarraco'),
    brand: 'Seat',
    name: 'Tarraco',
    price: 32000,
    description: 'SUV mediano con espacio para siete pasajeros y tecnología avanzada.',
    category: 'SUV',
    type: 'Gasoline',
    image: getVehicleImage(),
    specs: {
      power: '150 CV',
      consumption: '6.5 L/100 km'
    },
    features: ['Sistema de infoentretenimiento con pantalla táctil', 'Conectividad Bluetooth', 'Asistentes de conducción avanzados'],
    available: true
  },
  {
    id: generateId('Toyota', 'RAV4'),
    brand: 'Toyota',
    name: 'RAV4',
    price: 27000,
    description: 'SUV compacto con opciones híbridas y reputación de confiabilidad.',
    category: 'SUV Híbrido',
    type: 'Hybrid',
    image: getVehicleImage(),
    specs: {
      power: '219 CV',
      consumption: '5.5 L/100 km'
    },
    features: ['Sistema Toyota Safety Sense', 'Pantalla táctil de 8 pulgadas', 'Asistentes de conducción avanzados'],
    available: true
  },
  {
    id: generateId('Volkswagen', 'Tiguan'),
    brand: 'Volkswagen',
    name: 'Tiguan',
    price: 26000,
    description: 'SUV compacto con amplio espacio y tecnología alemana.',
    category: 'SUV',
    type: 'Gasoline',
    image: getVehicleImage(),
    specs: {
      power: '150 CV',
      consumption: '6.2 L/100 km'
    },
    features: ['Sistema de infoentretenimiento con pantalla táctil', 'Conectividad Bluetooth', 'Asistentes de conducción avanzados'],
    available: true
  }
];

export const featuredVehicles = vehicles.slice(0, 6);

export const vehicleCategories = [
  'Todos',
  'SUV Eléctrico',
  'Sedán Eléctrico',
  'SUV Eléctrico de Lujo',
  'Sedán Eléctrico de Lujo',
  'SUV Híbrido Enchufable',
  'SUV Híbrido',
  'Gasoline',
  'EV',
  'Hybrid',
  'Plug-in Hybrid',
  'Sedán',
  'Crossover',
  'Hatchback',
  'Camioneta',
  'SUV de Lujo',
  'Wagon',
  'Familiar',
  'SUV Todoterreno',
  'Sedán Deportivo',
  'Wagon Híbrido Enchufable'
];

export function calculateMonthlyPayment(amount: number, term: number): number {
  const annualInterestRate = 0.0699; // 6.99% APR
  const monthlyInterestRate = annualInterestRate / 12;
  const numberOfPayments = term;

  return (
    (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
  );
}