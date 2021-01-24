import { Map } from 'leaflet';
import {
  useMapEvents,
} from 'react-leaflet';

interface FlightLayerUpdaterProps {
  updateMapBounds: (map: Map) => void,
}

export default function FlightLayerUpdater({ updateMapBounds }:
FlightLayerUpdaterProps): JSX.Element {
  const map = useMapEvents({
    moveend: () => updateMapBounds(map),
  });
  return null;
}
