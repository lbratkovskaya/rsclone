import { LatLngBounds, LatLngExpression } from 'leaflet';
import { AircraftsMap, AircraftState } from '.';

export interface FlightsLayerState {
  // needRerender: boolean,
  aircrafts: AircraftsMap,
  aircraftArray: AircraftState[],
  mapBounds: LatLngBounds,
  trackLatLngs: LatLngExpression[],
}
