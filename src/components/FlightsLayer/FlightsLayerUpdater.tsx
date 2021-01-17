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
    moveend: () => {
      console.log('map move bounds:', map.getBounds());
      updateMapBounds(map);
    },
    zoomend: () => {
      console.log('map zoom bounds:', map.getBounds());
      updateMapBounds(map);
    },
    load: () => {
      console.log('map zoom bounds:', map.getBounds());
      updateMapBounds(map);
    },
  });
  return null;
}
