import { LatLngBounds, LatLngExpression, Map } from 'leaflet';
import { AircraftsMap, FavoritiesItem } from '.';

export interface FlightsLayerState {
  suppressRequest: boolean,
  aircrafts: AircraftsMap,
  mapBounds: LatLngBounds,
  trackLatLngs: {
    [key: string]: LatLngExpression[],
  }
  trackShowingAircrafts: string[],
}

export interface FlightsLayerProps {
  onMapBoundsUpdate: (map: Map) => void,
  userFavorities: FavoritiesItem[],
}
export interface TrackLayerUpdaterProps {
  latLngs: LatLngExpression[],
}

export interface FlightLayerUpdaterProps {
  updateMapBounds: (map: Map) => void,
  showFavoritiesTacks: () => void,
}
