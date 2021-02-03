import React from 'react';
import Airborne from '../SVGComponents/Airborne';
import { FlightInfoProps } from '../../../types/flightDataTypes';
import addPlusMinusUTCTime from '../../../utils/addPlusMinusUTCTime';
import getLocalData from '../../../utils/getLocalData';
import './FlightInfo.scss';

const FlightInfo:React.FC<FlightInfoProps> = ({
  timezoneOrigin,
  timezoneDestination,
  iataOrigin,
  cityOrigin,
  time,
  iataDestination,
  cityDestination,
}: FlightInfoProps): JSX.Element => {
  const timeBoolean = timezoneOrigin && timezoneDestination && time;
  return (
    <section className="flight-info">
      <div>
        <h2>{iataOrigin.toUpperCase()}</h2>
        <h3>{cityOrigin.toUpperCase()}</h3>
        <span>
          {`${timezoneOrigin.abbr} (UTC ${timezoneOrigin && addPlusMinusUTCTime(timezoneOrigin.offsetHours)})`}
        </span>
        <div className="flight-info__timetable">
          <span>{'SCHEDULED '}</span>
          <span>
            {timeBoolean
            && getLocalData(time.scheduled.departure, timezoneOrigin.offset).toString()
              .slice(16, 21)}
          </span>
        </div>
        <div className="flight-info__timetable">
          <span>{'ACTUAL '}</span>
          <span>
            {timeBoolean
            && getLocalData(time.real.departure, timezoneOrigin.offset).toString()
              .slice(16, 21)}
          </span>
        </div>
      </div>
      <div>
        <h2>{iataDestination.toUpperCase()}</h2>
        <h3>{cityDestination.toUpperCase()}</h3>
        <span>
          {`${timezoneDestination.abbr} (UTC ${timezoneDestination && addPlusMinusUTCTime(timezoneDestination.offsetHours)})`}
        </span>
        <div className="flight-info__timetable">
          <span>{'SCHEDULED '}</span>
          <span>
            {getLocalData(time.scheduled.arrival, timezoneDestination.offset)
              .toString().slice(16, 21)}
          </span>
        </div>
        <div className="flight-info__timetable">
          <span>{'ESTIMATED '}</span>
          <span>
            {timeBoolean && getLocalData(time.estimated.arrival, timezoneDestination.offset)
              .toString().slice(16, 21)}
          </span>
        </div>
      </div>
      <Airborne />
    </section>
  );
};

export default FlightInfo;
