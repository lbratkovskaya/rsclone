import { LatLngExpression } from 'leaflet';

export type FlightsMapStyle = 'dark' | 'light' | 'natural';
export interface FlightMapState {
  geoPosition: LatLngExpression,
  mapZoom: number,
  mapStyle: FlightsMapStyle,
}

export interface MapUpdaterProps {
  geoPosition: LatLngExpression,
  mapZoom: number,
}

export interface MapStyleSelectorProps {
  currentSelection: FlightsMapStyle,
  onStyleSelect: (key: FlightsMapStyle) => void,
}
