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
    departures: null
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
  visible: boolean
};

export type Schedule = {
  airportsServed: number
  countriesServed: number
  topRoute: {
    count: number
    from: string
    to: string
  }
  totalFlights: number
};

export type Runways = {
  length: {
    ft: number
    m: number
  },
  name: string
  surface: {
    code: string
    name: string
  }
};

export type Flight = {
  flight : {
    aircraft: any,
    airline: {
      code: {
        iata: string
        icao: string
      }
      name: string
      short: string
    }
    airport: {
      destination: any
      origin: any
      real: any
    }
    identification: any
    owner: any
    status: any
    time: any
  }
};

export type RatingInfo = {
  color: string
  percentage: number
  rating: number
  total: number
};

export type Timezone = {
  abbr: any
  abbrName: string
  isDst: boolean
  name: string
  offset: number
  offsetHours: string
};

export type FlightTime = {
  estimated: {
    departure: number | null,
    arrival: number | null}
  historical: {
    flighttime: string,
    delay: string}
  other: {
    eta: number | null,
    updated: number | null}
  real:
  {departure: number | null
    arrival: number | null}
  scheduled: {
    departure: number | null,
    arrival: number | null
  }
};
