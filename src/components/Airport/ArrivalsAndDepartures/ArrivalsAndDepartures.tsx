import React, { useEffect, useState } from 'react';
import { Flight, ArrivalsProps } from '../../../types/airportDataTypes';
import OneFlight from './OneFlight/OneFlight';
import FlightHeader from './FlightHeader/FlightHeader';
import getLocalData from '../../../utils/getLocalData';
import separateFlightsByDate from '../../../utils/separateFlightsBeDate';
import './ArrivalsAndDepartures.scss';

const Arrivals:React.FC<ArrivalsProps> = ({ airportCode, mode }: ArrivalsProps): JSX.Element => {
  const [flights, setFlights] = useState<Flight[] | null>(null);

  const modeBoolean = mode === 'arrivals';
  const modeInSingle = modeBoolean ? 'arrival' : 'departure';
  const aimAirport = modeBoolean ? 'origin' : 'destination';
  const aimAirportOffset = modeBoolean ? 'origin' : 'destination';

  const timestamp = Math.floor(((new Date()).getTime()) / 1000);

  useEffect(() => {
    fetch(`/api/schedule?airportCode=${airportCode}&mode=${mode}&timestamp=${timestamp}`, { method: 'GET' })
      .then((response) => response.json())
      .then((res) => setFlights(res.result.response.airport.pluginData.schedule[mode].data));
  }, [airportCode, mode]);

  let flightsSeparatedByDate: Array<Array<Flight>> = [];
  if (flights) {
    flightsSeparatedByDate = separateFlightsByDate(flights, modeInSingle);
  }

  return (
    <div className="airport-flight-wrapper">
      { flightsSeparatedByDate
        && flightsSeparatedByDate.map((flightsDay: Flight[], i: number) => {
          const { time, airport: airp } = flightsDay[0]?.flight || {};
          const dateBoolean = time.scheduled[modeInSingle] && airp.origin?.timezone?.offset;
          return (
            <React.Fragment key={`flightsDay_${i}`}>
              <FlightHeader
                mode={mode}
                date={dateBoolean ? getLocalData(time.scheduled[modeInSingle],
                  airp.origin.timezone.offset).toString() : ''}
              />
              {flightsDay.map((flight:Flight) => {
                const { airport, identification, aircraft } = flight.flight;
                const { position } = airport?.[aimAirport] || {};
                const { code } = flight?.flight?.airline || {};
                return (
                  <OneFlight
                    key={identification.number.default}
                    time={flight.flight.time?.scheduled[modeInSingle] || 0}
                    offset={airport[aimAirportOffset]?.timezone?.offset || 0}
                    airlineCodeIata={code.iata || 'N/A'}
                    airlineCodeIcao={code.icao || 'N/A'}
                    airportTo={position?.region?.city || 'N/A'}
                    airportToCode={code?.iata || 'N/A'}
                    aircraftNumber={identification?.number?.default || 'N/A'}
                    aircraftModel={aircraft?.model?.code || 'N/A'}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default Arrivals;
