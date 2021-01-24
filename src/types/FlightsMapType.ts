import { LatLngExpression } from 'leaflet';

export interface FlightMapState {
  geoPosition: LatLngExpression,
}

export interface MapUpdaterProps {
  geoPosition: LatLngExpression,
  mapZoom: number,
}
