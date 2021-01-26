import React, { useEffect, useState } from 'react';
import { Flight } from '../../../types/types';
import OneFlight from './OneFlight/OneFlight';
import FlightHeader from './FlightHeader/FlightHeader';
import getLocalData from '../../../utils/getLocalData';
import './ArrivalsAndDepartures.scss';

interface ArrivalsProps {
  code: string,
  mode: string
}

const Arrivals:React.FC<ArrivalsProps> = ({ code, mode }: ArrivalsProps) : JSX.Element => {
  const [flights, setFlights] = useState<Flight[] | null>(null);

  const modeInSingle = mode === 'arrivals' ? 'arrival' : 'departure';
  const aimAirport = mode === 'arrivals' ? 'origin' : 'destination';
  const aimAirportOffset = mode !== 'arrivals' ? 'origin' : 'destination';

  const timestamp = Math.floor(((new Date()).getTime()) / 1000);
  useEffect(() => {
    fetch(`/api/schedule?airportCode=${code}&mode=${mode}&timestamp=${timestamp}`, { method: 'GET' })
      .then((response) => response.json())
      .then((res) => setFlights(res.result.response.airport.pluginData.schedule[mode].data));
  }, [code, mode]);

  let beginningDate;
  const flightsSeparatedByDate: Array<Array<Flight>> = [];
  if (flights) {
    beginningDate = getLocalData(flights[0].flight.time.scheduled[modeInSingle],
      flights[0].flight.airport.origin.timezone.offset);
    for (let i = 0, j = 0; i < flights.length; i += 1) {
      let day = beginningDate.getDay();
      if (day === getLocalData(flights[i].flight.time.scheduled[modeInSingle],
        flights[i].flight.airport.origin.timezone.offset).getDay()) {
        if (!flightsSeparatedByDate[j]) {
          flightsSeparatedByDate[j] = [];
        }
        flightsSeparatedByDate[j].push(flights[i]);
      } else {
        day = getLocalData(flights[i].flight.time.scheduled[modeInSingle],
          flights[i].flight.airport.origin.timezone.offset).getDay();
        if (getLocalData(flights[i].flight.time.scheduled[modeInSingle],
          flights[i].flight.airport.origin.timezone.offset).getDay()
          !== getLocalData(flights[i - 1].flight.time.scheduled[modeInSingle],
            flights[i].flight.airport.origin.timezone.offset).getDay()) {
          j += 1;
          flightsSeparatedByDate[j] = [];
        }
        flightsSeparatedByDate[j].push(flights[i]);
      }
    }
  }

  return (
    <div className="airport-flight-wrapper">
      { flightsSeparatedByDate ? flightsSeparatedByDate.map((flightsDay: Flight[]) => (
        <React.Fragment key={Math.random()}>
          <FlightHeader
            mode={mode}
            date={getLocalData(flightsDay[0].flight.time.scheduled[modeInSingle],
              flightsDay[0].flight.airport.origin.timezone.offset).toString()}
          />
          {flightsDay.map((flight:Flight) => (
            <OneFlight
              key={flight.flight.identification.number.default}
              time={flight.flight.time.scheduled[modeInSingle]}
              offset={flight.flight.airport[aimAirportOffset].timezone.offset}
              airlineCodeIata={flight.flight.airline.code.iata}
              airlineCodeIcao={flight.flight.airline.code.icao}
              airportTo={flight.flight.airport[aimAirport].position.region.city}
              airportToCode={flight.flight.airport[aimAirport].code.iata}
              aircraftNumber={flight.flight.identification.number.default}
              aircraftModel={flight.flight.aircraft.model.code}
            />
          ))}
        </React.Fragment>
      ))
        : null}
    </div>
  );
};

export default Arrivals;
