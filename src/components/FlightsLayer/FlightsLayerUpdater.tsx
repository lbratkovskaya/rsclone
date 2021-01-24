import { LatLng, LeafletKeyboardEvent } from 'leaflet';
import {
  useMapEvents,
} from 'react-leaflet';
import { FlightLayerUpdaterProps } from '../../types/FlightsLayerType';

export default function FlightLayerUpdater({ updateMapBounds }:
FlightLayerUpdaterProps): JSX.Element {
  const map = useMapEvents({
    moveend: () => updateMapBounds(map),
  });
  return null;
}
