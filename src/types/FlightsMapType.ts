import { LatLngExpression, LeafletMouseEvent } from 'leaflet';
import { FlightsMapStyle, IUser } from './';

export interface FlightMapProps {
  userData: IUser,
  onAircraftIconClick: (flightId: string, isShowing: boolean) => void,
  onAirportIconClick: (event: LeafletMouseEvent) => void,
  showDepartures: (airportCode: string) => void,
  showArrivals: (airportCode: string) => void,
}

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

export interface FuncAirportsLayerProps {
  onAirportIconClick: (event: LeafletMouseEvent) => void,
  showDepartures: (airportCode: string) => void,
  showArrivals: (airportCode: string) => void,
}
