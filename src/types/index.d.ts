export interface AircraftState {
  icao24: string,
  latitude: number,
  longitude: number,
  true_track: number,
  altitude: number,
  velocity: number,
  aircraft_type: string,
  registration: string,
  time_position: number,
  airport_from: string,
  airport_to: string,
  callsign: string,
  positions:
  {
    latitude: number,
    longitude: number,
    true_track: number,
    altitude: number,
    velocity: number,
    time_position: number,
  }[],
}

interface AircraftsMap {
  [key: string]: AircraftState;
}

interface IconFrame {
  [key: string]: {
    x: number,
    y: number,
    w: number,
    h: number
  },
}

export interface AircraftIcon {
  rotates: boolean,
  aliases: string[],
  frames: IconFrame[]
}

export interface AircraftIconGroup {
  [key: string]: AircraftIcon
}
