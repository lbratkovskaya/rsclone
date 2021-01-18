import L, { LatLngExpression } from 'leaflet';
import {
  useMap,
} from 'react-leaflet';

interface TrackLayerUpdaterProps {
  latLngs: LatLngExpression[],
}

export default function TrackLayerUpdater({ latLngs }:
TrackLayerUpdaterProps): JSX.Element {
  const map = useMap();

  L.polyline(latLngs, { color: 'red' }).addTo(map);

  return null;
}
