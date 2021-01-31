import React from 'react';
import Airborne from '../SVGComponents/Airborne';
import './FlightInfo.scss';
import { Timezone, FlightTime } from '../../../types/types';
import addPlusMinusUTCTime from '../../../utils/addPlusMinusUTCTime';
import getLocalData from '../../../utils/getLocalData';

interface FlightInfoProps {
  timezoneOrigin: Timezone
  timezoneDestination: Timezone
  iataOrigin: string
  cityOrigin: string
  time: FlightTime
  iataDestination: string
  cityDestination: string
}

const FlightInfo:React.FC<FlightInfoProps> = ({
  timezoneOrigin,
  timezoneDestination, iataOrigin, cityOrigin, time,
  iataDestination, cityDestination,
}: FlightInfoProps)
:JSX.Element => (
  <section className="flight-info">
    <div>
      <h2>{iataOrigin.toUpperCase()}</h2>
      <h3>{cityOrigin.toUpperCase()}</h3>
      <span>
        {timezoneOrigin.abbr}
        {' '}
        (UTC
        {' '}
        {addPlusMinusUTCTime(timezoneOrigin.offsetHours)}
        )
      </span>
      <div className="flight-info__timetable">
        <span>SCHEDULED</span>
        {' '}
        <span>
          {getLocalData(time.scheduled.departure, timezoneOrigin.offset).toString().slice(16, 21)}
        </span>
      </div>
      <div className="flight-info__timetable">
        <span>ACTUAL</span>
        {' '}
        <span>
          {getLocalData(time.real.departure, timezoneOrigin.offset).toString().slice(16, 21)}
        </span>
      </div>
    </div>
    <div>
      <h2>{iataDestination.toUpperCase()}</h2>
      <h3>{cityDestination.toUpperCase()}</h3>
      <span>
        {timezoneDestination.abbr}
        {' '}
        (UTC
        {' '}
        {addPlusMinusUTCTime(timezoneDestination.offsetHours)}
        )
      </span>
      <div className="flight-info__timetable">
        <span>SCHEDULED</span>
        {' '}
        <span>
          {getLocalData(time.scheduled.arrival, timezoneDestination.offset)
            .toString().slice(16, 21)}
        </span>
      </div>
      <div className="flight-info__timetable">
        <span>ESTIMATED</span>
        {' '}
        <span>
          {getLocalData(time.estimated.arrival, timezoneDestination.offset)
            .toString().slice(16, 21)}
        </span>
      </div>
    </div>
    <Airborne />
  </section>
);

export default FlightInfo;
