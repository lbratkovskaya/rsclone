export interface AircraftState {
  icao24: string,
  callsign: string,
  origin_country: string,
  time_position: number,
  last_contact: number,
  longitude: number,
  latitude: number,
  baro_altitude: number,
  on_ground: boolean,
  velocity: number,
  true_track: number,
  positions:
    {
    time_position: number,
    longitude: number,
    latitude: number,
    baro_altitude: number,
    velocity: number,
  }[],
}

interface AircraftsMap {
  [key: string]: AircraftState;
}