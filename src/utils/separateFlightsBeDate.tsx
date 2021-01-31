import { Flight } from '../types/airportDataTypes';
import getLocalData from './getLocalData';

const separateFlightsByDate = (flights: Flight[], mode: string): Array<Array<Flight>> | [] => {
  const flightsSeparatedByDate: Array<Array<Flight>> = [];
  const { time: timeZero, airport: airportZero } = flights[0].flight;
  const dateBoolean = timeZero.scheduled[mode] && airportZero.origin.timezone.offset;
  const beginningDate = dateBoolean && getLocalData(timeZero.scheduled[mode],
    airportZero.origin.timezone.offset);
  for (let i = 0, j = 0; i < flights.length; i += 1) {
    const { time, airport } = flights[i].flight;
    let day = beginningDate && beginningDate.getDay();
    const dataNowBoolean = time.scheduled[mode] && airport.origin.timezone.offset;
    if (!dataNowBoolean || !day) {
      return flightsSeparatedByDate;
    }
    if (day === getLocalData(time.scheduled[mode],
      airport.origin.timezone.offset).getDay()) {
      if (!flightsSeparatedByDate[j]) {
        flightsSeparatedByDate[j] = [];
      }
      flightsSeparatedByDate[j].push(flights[i]);
    } else {
      day = getLocalData(time.scheduled[mode],
        airport.origin.timezone.offset).getDay();
      if (getLocalData(time.scheduled[mode],
        airport.origin.timezone.offset).getDay()
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
