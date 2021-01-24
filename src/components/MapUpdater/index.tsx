import { Map } from 'leaflet';
import { useMap } from 'react-leaflet';
import { MapUpdaterProps } from '../../types/FlightsMapType';

export default function MapUpdater({ geoPosition, mapZoom }: MapUpdaterProps): JSX.Element {
  const map: Map = useMap();

  map.setView(geoPosition, mapZoom);
  return null;
}
