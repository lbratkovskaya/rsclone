export type TargetAirport2 = {
  iata: string,
  icao: string,
  shortName: string,
  fullName:string,
  municipalityName:string,
  location:{
    lat: number,
    lon: number
  }
  country:{
    code: string,
    name: string
  }
  continent:{
    code:string,
    name: string
  }
  timeZone:string,
  urls: {
    webSite: string,
    wikipedia:string,
    twitter:string,
    googleMaps:string,
    flightRadar:string
  }
};

export type TargetAirport = {
  alt: number | string,
  country: string,
  iata: string,
  icao: string,
  lat: number
  lon: number
  name: string
};

export type Time = {
  countryCode: string
  countryName: string
  dstOffset: number
  gmtOffset: number
  lat: number
  lng: number
  rawOffset: number
  sunrise: string
  sunset: string
  time: string
  timezoneId: string
};

export type FlightInfo = {
  aircraft: {
    model: string,
    reg: string
  }
  airline:{
    name: string
  }
  arrival:{
    actualTimeLocal: string,
    actualTimeUtc: string,
    baggageBelt: string,
    quality: any,
    runwayTimeLocal: string,
    runwayTimeUtc: string,
    scheduledTimeLocal: string,
    scheduledTimeUtc:string,
    terminal: string,
  },
  callSign: string,
  codeshareStatus: string,
  departure: any,
  isCargo: boolean,
  number: string
  status: string
};
