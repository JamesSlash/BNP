export function getRandomFeaturedVehicles(vehicles: Vehicle[], count: number = 6): Vehicle[] {
  const shuffled = [...vehicles].sort(() => 0.5 - Math.random());
  const unique = Array.from(new Map(shuffled.map(v => [v.id, v])).values());
  return unique.slice(0, count);
}
