import React, { useState } from 'react';
import Arrow from '../SVGComponents/Arrow';
import getDateHistory from '../../../utils/getDateHistory';
import { RecentFlightsProps, HistoryInfo } from '../../../types/flightDataTypes';
import Calendar from '../SVGComponents/Calendar';
import './RecentFlights.scss';

const RecentFlights:React.FC<RecentFlightsProps> = ({ registration, history }
: RecentFlightsProps): JSX.Element => {
  const [openFlights, setOpenFlights] = useState(false);
  const collapseHandler = ():void => {
    setOpenFlights(!openFlights);
  };

  return (
    <section className="flight-recent">
      <p onClick={collapseHandler} role="presentation" className="flight-recent__heading">
        <Calendar />
        <span className={openFlights ? 'reverse' : ''}>
          Recent
          {' '}
          {registration}
          {' '}
          flights
        </span>
        <Arrow />
      </p>
      <div className={openFlights ? '' : 'collapse'}>
        <h3>
          <span>DATE </span>
          <span>FLIGHT/ROUTE</span>
        </h3>
        <>
          { history.map((item: HistoryInfo) => (
            <div className="flight-recent__flight" key={item.identification.id}>
              <div className="flight-recent__flight-date">
                {getDateHistory(item.time.real.departure)}
              </div>
              <div className="flight-recent__flight-number">
                <p>{item.identification.number.default}</p>
                <p className="flight-recent__flight-airport">
                  <span>{item.airport.destination.position.region.city}</span>
                  {' ('}
                  <span>{item.airport.destination.code.iata}</span>
                  {') '}
                </p>
                <p className="flight-recent__flight-airport">
                  <span>{item.airport.origin.position.region.city}</span>
                  {' ('}
                  <span>{item.airport.origin.code.iata}</span>
                  {') '}
                </p>
              </div>
            </div>
          ))}
        </>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.flightradar24.com/data/aircraft/${registration.toLowerCase()}`}
        >
          <span className="airport-schedule__arrow-icon">
            More
            {' '}
            {registration}
            {' '}
            flights
            <Arrow />
          </span>
        </a>
        {/* <p className="flight-recent__more">
          MORE
          {' '}
          {registration}
          {' '}
          flights
          <Arrow />
        </p> */}
      </div>
    </section>
  );
};

export default RecentFlights;
