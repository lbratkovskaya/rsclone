import { LatLngBounds, LatLngExpression } from 'leaflet';
import { AircraftsMap } from '.';

export interface FlightsLayerState {
  supressRequest: boolean,
  aircrafts: AircraftsMap,
  mapBounds: LatLngBounds,
  trackLatLngs: LatLngExpression[],
  trackShowingAircraft: string,
}
