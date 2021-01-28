type Photo = {
  copyright: string,
  link: string,
  source: string,
  src: string,
};

export type AirportInfo = {
  airportImages: {
    large: Photo[],
    medium: Photo[],
    thumbnails: Photo[],
  },
  code: {
    iata: string,
    icao: string,
  },
  delayIndex: {
    arrivals: null,
    departures: null,
  },
  name: string,
  position: {
    country: {name: string, code: string, id: number},
    elevation: number,
    latitude: number,
    longitude: number,
    region: {city: string},
  },
  stats: null,
  timezone: {
    abbr: string,
    abbrName: null,
    isDst: boolean,
    name: string,
    offset: number,
  }
  url: {
    homepage: string | null,
    webcam: string | null,
    wikipedia: string | null,
  }
  visible: boolean,
};

export type Schedule = {
  airportsServed: number,
  countriesServed: number,
  topRoute: {
    count: number,
    from: string,
    to: string,
  }
  totalFlights: number,
};

export type Runways = {
  length: {
    ft: number,
    m: number,
  },
  name: string,
  surface: {
    code: string,
    name: string,
  }
};

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

export type RatingInfo = {
  color: string,
  percentage: number,
  rating: number,
  total: number,
};

export interface AirportPhotoProps {
  airportInfo: AirportInfo,
}

export interface ArrivalsProps {
  code: string,
  mode: string,
}

export interface AirportProps {
  code: string,
  openAirportPanel: boolean,
}

export interface FlightHeaderProps {
  mode: string,
  date: string,
}

export interface ScheduledFlightsProps {
  schedule: Schedule,
}

export interface RunwayProps {
  satelliteImage: string,
  runways: Runways[],
}

export interface WeatherProps {
  airportInfo: AirportInfo,
}

export interface RatingProps {
  iata: string,
  name: string,
}

export interface HeaderProps {
  airportInfo: AirportInfo,
  closeHandler: () => void,
}

type Urls = {
  webSite: string,
  wikipedia:string,
  twitter:string,
  googleMaps:string,
  flightRadar:string,
};

export interface InfoLinksProps {
  links: Urls,
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

export type WeatherInfo = {id:number, main:string, description: string, icon: string};
export type Temp = {
  temp:number, feels_like :number, temp_min:number,
  temp_max:number, pressure:number, humidity:number, sea_level:number, grnd_level:number,
};
