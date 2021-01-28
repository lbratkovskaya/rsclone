import { Flight } from '../types/airportDataTypes';
import getLocalData from './getLocalData';

const separateFlightsByDate = (flights: Flight[], mode: string): Array<Array<Flight>> => {
  const flightsSeparatedByDate: Array<Array<Flight>> = [];
  const beginningDate = getLocalData(flights[0].flight.time.scheduled[mode],
    flights[0].flight.airport.origin.timezone.offset);
  for (let i = 0, j = 0; i < flights.length; i += 1) {
    let day = beginningDate.getDay();
    if (day === getLocalData(flights[i].flight.time.scheduled[mode],
      flights[i].flight.airport.origin.timezone.offset).getDay()) {
      if (!flightsSeparatedByDate[j]) {
        flightsSeparatedByDate[j] = [];
      }
      flightsSeparatedByDate[j].push(flights[i]);
    } else {
      day = getLocalData(flights[i].flight.time.scheduled[mode],
        flights[i].flight.airport.origin.timezone.offset).getDay();
      if (getLocalData(flights[i].flight.time.scheduled[mode],
        flights[i].flight.airport.origin.timezone.offset).getDay()
        !== getLocalData(flights[i - 1].flight.time.scheduled[mode],
          flights[i].flight.airport.origin.timezone.offset).getDay()) {
        j += 1;
        flightsSeparatedByDate[j] = [];
      }
      flightsSeparatedByDate[j].push(flights[i]);
    }
  }
  return flightsSeparatedByDate;
};

export default separateFlightsByDate;
