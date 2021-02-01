import React from 'react';
import Routes from '../SVGComponents/Routes';
import Arrow from '../SVGComponents/Arrow';
import './ScheduledFlights.scss';
import { ScheduledFlightsProps } from '../../../types/airportDataTypes';
import { futurePeriod } from '../../../utils/airportConstants';

const ScheduledFlights:React.FC<ScheduledFlightsProps> = ({ schedule }: ScheduledFlightsProps)
: JSX.Element => {
  const link = `https://www.flightradar24.com/data/airports/${schedule.topRoute.from.toLowerCase()}/routes`;

  return (
    <div className="airport-schedule">
      <h2 className="airport-schedule__name">
        SCHEDULED FLIGHTS - NEXT
        {futurePeriod}
        {' '}
        DAYS
      </h2>
      <div className="airport-schedule__container">
        <div className="airport-schedule__icon"><Routes /></div>
        <div className="flex-wrapper">
          <div className="row">
            <div className="hasTooltip" data-tooltip-value={`Total number of scheduled flights in the next ${futurePeriod} days.`}>
              <span>Departures</span>
              <span>{schedule?.totalFlights || 'N/A'}</span>
            </div>
            <div className="hasTooltip" data-tooltip-value={`The route with the most number of scheduled flights over the next ${futurePeriod} days.`}>
              <span>Busiest route</span>
              <span>
                {schedule?.topRoute?.from || 'N/A'}
                –
                {schedule?.topRoute?.to || 'N/A'}
                &nbsp;
                <span className="route-count">
                  {schedule?.topRoute?.count || 'N/A'}
                  &nbsp;
                  flights
                </span>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="hasTooltip" data-tooltip-value="Total number of destinations from this airport.">
              <span>Airports served</span>
              <span>{schedule.airportsServed || 'N/A'}</span>
            </div>
            <div className="hasTooltip" data-tooltip-value="Total number of countries served from this airport.">
              <span>Countries served</span>
              <span>{schedule.countriesServed || 'N/A'}</span>
            </div>
          </div>
          {link && (
          <div className="row-link">
            <a
              target="_blank"
              rel="noreferrer"
              href={link}
            >
              <span className="airport-schedule__arrow-icon">
                Complete schedule and route map
                <Arrow />
              </span>
            </a>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduledFlights;
