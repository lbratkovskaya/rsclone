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
  history: HistoryInfo[],
};
