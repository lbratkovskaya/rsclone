type Photo = {
  copyright: string,
  link: string,
  source: string,
  src: string,
};

export type AirportInfo = {
  airportImages?: {
    large?: Photo[] | null,
    medium?: Photo[] | null,
    thumbnails?: Photo[] | null,
  },
  code?: {
    iata?: string | null,
    icao?: string | null,
  },
  delayIndex?: {
    arrivals?: any,
    departures?: any,
  },
  name?: string | null,
  position?: {
    country?: { name?: string | null, code?: string | null, id?: number | null },
    elevation?: number | null,
    latitude?: number | null,
    longitude?: number | null,
    region?: { city?: string | null },
  },
  stats?: any,
  timezone?: {
    abbr?: string | null,
    abbrName?: any,
    isDst?: boolean | null,
    name?: string | null,
    offset?: number | null,
  }
  url?: {
    homepage?: string | null,
    webcam?: string | null,
    wikipedia?: string | null,
  }
  visible?: boolean | null,
};

export type Schedule = {
  airportsServed?: number | null,
  countriesServed?: number | null,
  topRoute?: {
    count?: number | null,
    from?: string | null,
    to?: string | null,
  }
  totalFlights?: number | null,
};

export type Runways = {
  length?: {
    ft?: number | null,
    m: number | null,
  },
  name?: string | null,
  surface?: {
    code?: string | null,
    name?: string | null,
  }
};

export type Flight = {
  flight?: {
    aircraft: any,
    airline?: {
      code?: {
        iata: string,
        icao: string,
      }
      name?: string,
      short?: string,
    }
    airport?: {
      destination?: any,
      origin?: any,
      real?: any,
    }
    identification?: {
      id: string,
      row: number,
      number: { default: string, alternative?: string }
    },
    owner?: any,
    status?: any,
    time?: any,
  }
};

export type RatingInfo = {
  color?: string | null,
  percentage?: number | null,
  rating?: number | null,
  total?: number | null,
};

export interface AirportPhotoProps {
  airportInfo: AirportInfo | null,
}

export interface ArrivalsProps {
  airportCode: string,
  mode: string,
}

export interface AirportProps {
  code: string,
  activeTab?: number,
  openAirportPanel: boolean,
  setOpenPanel: (setOpen: boolean) => void,
}

export interface AirportState {
  airportInfo: AirportInfo,
  schedule: Schedule,
  runwaysData: Runways[],
  satelliteImageData: string,
  activeTab: number,
  openPanel: boolean,
}

export interface FlightHeaderProps {
  mode: string,
  date: string,
}

export interface ScheduledFlightsProps {
  schedule: Schedule | null,
}

export interface RunwayProps {
  satelliteImage: string | null,
  runways: Runways[] | null,
}

export interface WeatherProps {
  airportInfo: AirportInfo | null,
}

export interface RatingProps {
  iata: string,
  name: string,
}

export interface HeaderProps {
  airportInfo: AirportInfo,
  closeHandler: () => void,
}

export interface OneFlightProps {
  time: number,
  offset: number,
  airlineCodeIata: string,
  airlineCodeIcao: string,
  airportTo: string,
  airportToCode: string,
  aircraftNumber: string,
  aircraftModel: string,
}

export interface ButtonProps {
  num: number,
  name: string,
  active: number,
  changeTabHandler: (num: number) => void,
}

export type WeatherInfo = {
  id?: number | null,
  main?: string | null,
  description?: string | null,
  icon?: string | null
};

export type Temp = {
  temp?: number | null,
  feels_like?: number | null,
  temp_min?: number | null,
  temp_max?: number | null,
  pressure?: number | null,
  humidity?: number | null,
  sea_level?: number | null,
  grnd_level?: number | null,
};

export type Wind = { speed?: number | null, deg?: number | null };
