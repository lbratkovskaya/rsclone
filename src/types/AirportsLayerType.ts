export interface AirportsLayerState {
  airportsMap: AirportMap,
}
export interface AirportMap {
  version: number,
  airports: AirportType[],
}
export interface AirportType {
  name: string,
  iata: string,
  icao: string,
  lat: number,
  lon: number,
  country: string,
  alt: number,
}
