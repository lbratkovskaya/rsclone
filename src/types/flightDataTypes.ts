export type Flight = {
  flight : {
    aircraft: any,
    airline: {
      code: {
        iata: string,
        icao: string,
      }
      name: string,
      short: string,
    }
    airport: {
      destination: any,
      origin: any,
      real: any,
    }
    identification: any,
    owner: any,
    status: any,
    time: any,
  }
};

export type Timezone = {
  abbr: any,
  abbrName: string,
  isDst: boolean,
  name: string,
  offset: number,
  offsetHours: string,
};

export type FlightTime = {
  estimated: {
    departure: number | null,
    arrival: number | null},
  historical: {
    flighttime: string,
    delay: string,
  }
  other: {
    eta: number | null,
    updated: number | null,
  }
  real:
  {departure: number | null,
    arrival: number | null,
  }
  scheduled: {
    departure: number | null,
    arrival: number | null,
  }
};

type AirportHistory = {
  code: {
    iata: string,
    icao: string,
  },
  name: string,
  position: any,
  timezone: any,
  visible: boolean,
  website: string,
};

export type HistoryInfo = {
  airport: {
    destination: AirportHistory,
    origin: AirportHistory,
  }
  identification: any,
  time: any
};

export interface RecentFlightsProps {
  registration: string,
  history: HistoryInfo[] | null,
}

export interface AircraftInfoProps {
  model: {
    code?: string | null,
    text?: string | null,
  }
  registration: string,
  airline: {
    iata?: string | null,
    icao?: string | null,
  }
}

export interface AircraftPhotoProps {
  photo: string | null,
  photoLink: string | null,
}

export interface AltitudeProps {
  alt: number | null,
  hd: number | null,
}

export interface FlightDataProps {
  hex: string,
  lat: number | null,
  lng: number | null,
  airline: {
    iata?: string | null,
    icao?: string | null,
  },
}

export interface FlightInfoProps {
  timezoneOrigin: Timezone | null,
  timezoneDestination: Timezone | null,
  iataOrigin: string,
  cityOrigin: string,
  time: FlightTime | null,
  iataDestination: string,
  cityDestination: string,
}

type Point = {
  alt?: number | null,
  hd?: number | null,
  lat?: number | null,
  lng?: number | null,
  spd?: number | null,
  ts?: number | null,
};

type EndPoint = {
  altitude?: number | null,
  country?: any,
  latitude?: number | null,
  longitude?: number | null,
  region?: any,
};
export interface FlightProgressProps {
  startPoint: Point | null,
  currentPoint: Point | null,
  endPoint: EndPoint | null,
  currentTime: number | null,
  startTime: number | null,
  endTime: number | null,
  hexCode: string,
}

export interface HeaderFlightPanelProps {
  number: string,
  callsign: string,
  airline: string,
  closeHandler: () => void,
}

export interface SpeedProps {
  spd: number | null,
}

export interface FlightPanelProps {
  hexCode: string
  openFlightPanel: boolean,
}

export interface FlightButtonProps {
  toggleSelectedFlights: (clicked: boolean) => void,
  isFollowed: boolean,
}

export interface FollowedFlight {
  addedToFavorites: Date,
  flightId: string,
  registration: string,
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
}

