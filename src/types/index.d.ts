export interface AircraftPosition {
  latitude: number,
  longitude: number,
  true_track: number,
  altitude: number,
  velocity: number,
  time_position: number,
}

export interface AircraftState {
  icao24: string,

  currentPosition: AircraftPosition,
  aircraft_type: string,
  registration: string,
  airport_from: string,
  airport_to: string,
  callsign: string,
  positions: AircraftPosition[],
}

interface AircraftsMap {
  [key: string]: AircraftState,
}

interface IconFrame {
  [key: string]: {
    x: number,
    y: number,
    w: number,
    h: number,
  },
}

export interface AircraftIcon {
  rotates: boolean,
  aliases: string[],
  frames: IconFrame[],
}

export interface AircraftIconGroup {
  [key: string]: AircraftIcon,
}

export interface UserMapSettings {
  mapStyle: FlightsMapStyle,
  mapZoom: number,
}

export type FlightsMapStyle = 'dark' | 'light' | 'natural';

export interface IUser {
  id: string,
  username: string,
  lastSessionEndedDate?: Date,
  favorites?: [
    {
      addedToFavorites: Date,
      codeName: string,
      arrivalAirport: {
        name: string,
        code: string,
        position: {
          latitude: string,
          longitude: string
        }
      },
      departureAirport: {
        name: string,
        code: string,
        position: {
          latitude: string,
          longitude: string
        }
      },
    },
  ]
}
