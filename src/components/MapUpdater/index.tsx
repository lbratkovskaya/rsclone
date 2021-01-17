import { LatLngExpression, Map } from 'leaflet';
import { useMap } from 'react-leaflet';

interface MapUpdaterProps {
  geoPosition: LatLngExpression,
  mapZoom: number,
}

export default function MapUpdater({ geoPosition, mapZoom }: MapUpdaterProps): JSX.Element {
  const map: Map = useMap();

  map.setView(geoPosition, mapZoom);
  return null;
}
