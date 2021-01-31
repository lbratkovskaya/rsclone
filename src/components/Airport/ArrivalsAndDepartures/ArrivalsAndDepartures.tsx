import React, { useEffect, useState } from 'react';
import { Flight, ArrivalsProps } from '../../../types/airportDataTypes';
import OneFlight from './OneFlight/OneFlight';
import FlightHeader from './FlightHeader/FlightHeader';
import getLocalData from '../../../utils/getLocalData';
import separateFlightsByDate from '../../../utils/separateFlightsBeDate';
import './ArrivalsAndDepartures.scss';

const Arrivals:React.FC<ArrivalsProps> = ({ code, mode }: ArrivalsProps): JSX.Element => {
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

  let flightsSeparatedByDate: Array<Array<Flight>> = [];
  if (flights) {
    flightsSeparatedByDate = separateFlightsByDate(flights, modeInSingle);
  }

  return (
    <div className="airport-flight-wrapper">
      { flightsSeparatedByDate
        && flightsSeparatedByDate.map((flightsDay: Flight[]) => (
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
        ))}
    </div>
  );
};

export default Arrivals;
