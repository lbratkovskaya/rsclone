const getDistance = (lat1: number, lat2: number, lng1: number, lng2: number): string => {
  const R = 6371; // Earth's radius
  const sin1 = Math.sin((((lat1 - lat2) * Math.PI) / 180) / 2);
  const sin2 = Math.sin((((lng1 - lng2) * Math.PI) / 180) / 2);

  return (2 * R * Math.asin(Math.sqrt(sin1 * sin1 + sin2 * sin2 * Math.cos((lat1 * Math.PI)
  / 180) * Math.cos((lat2 * Math.PI) / 180)))).toFixed(0);
};

export default getDistance;
