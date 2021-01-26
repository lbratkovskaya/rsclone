import React from 'react';
import { Schedule } from '../../../types/types';
import Routes from '../../../img/Routes';
import Arrow from '../../../img/Arrow';
import './ScheduledFlights.scss';

interface ScheduledFlightsProps {
  schedule: Schedule
}

const ScheduledFlights:React.FC<ScheduledFlightsProps> = ({ schedule }: ScheduledFlightsProps)
: JSX.Element => (
  <div className="airport-schedule">
    <h2 className="airport-schedule__name">SCHEDULED FLIGHTS - NEXT 7 DAYS</h2>
    <div className="airport-schedule__container">
      <div className="airport-schedule__icon"><Routes /></div>
      <div className="flex-wrapper">
        <div className="row">
          <div className="hasTooltip" data-tooltip-maxwidth="200px" data-tooltip-value="Total number of scheduled flights in the next 7 days.">
            <span>Departures</span>
            <span>{schedule.totalFlights}</span>
          </div>
          <div className="hasTooltip" data-tooltip-maxwidth="200px" data-tooltip-value="The route with the most number of scheduled flights over the next 7 days.">
            <span>Busiest route</span>
            <span>
              {schedule.topRoute.from}
              –
              {schedule.topRoute.to}
              &nbsp;
              <span className="route-count">
                {schedule.topRoute.count}
                &nbsp;
                flights
              </span>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="hasTooltip" data-tooltip-maxwidth="200px" data-tooltip-value="Total number of destinations from this airport.">
            <span>Airports served</span>
            <span>{schedule.airportsServed}</span>
          </div>
          <div className="hasTooltip" data-tooltip-maxwidth="200px" data-tooltip-value="Total number of countries served from this airport.">
            <span>Countries served</span>
            <span>{schedule.countriesServed}</span>
          </div>
        </div>
        <div className="row-link">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.flightradar24.com/data/airports/${schedule.topRoute.from.toLowerCase()}/routes`}
          >
            <span className="airport-schedule__arrow-icon">
              Complete schedule and route map
              <Arrow />
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default ScheduledFlights;
