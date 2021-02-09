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
  const timeBoolean = timezoneOrigin && time && timezoneOrigin.offset;
  return (
    <section className="flight-info">
      <div>
        <h2>{iataOrigin.toUpperCase()}</h2>
        <h3>{cityOrigin.toUpperCase()}</h3>
        <span>
          {`${timezoneOrigin?.abbr || ''} (UTC ${timezoneOrigin && timezoneOrigin.offsetHours
            && addPlusMinusUTCTime(timezoneOrigin.offsetHours)})`}
        </span>
        <div className="flight-info__timetable">
          <span>{'SCHEDULED '}</span>
          <span>
            {timeBoolean && time.scheduled && time.scheduled.departure
            && getLocalData(time.scheduled.departure, timezoneOrigin.offset).toString()
              .slice(16, 21)}
          </span>
        </div>
        <div className="flight-info__timetable">
          <span>{'ACTUAL '}</span>
          <span>
            {timeBoolean && time.real && time.real.departure
            && getLocalData(time.real.departure, timezoneOrigin.offset).toString()
              .slice(16, 21)}
          </span>
        </div>
      </div>
      <div>
        <h2>{iataDestination.toUpperCase()}</h2>
        <h3>{cityDestination.toUpperCase()}</h3>
        <span>
          {`${timezoneDestination?.abbr || ''} (UTC ${timezoneDestination && timezoneDestination.offsetHours
            && addPlusMinusUTCTime(timezoneDestination.offsetHours)})`}
        </span>
        <div className="flight-info__timetable">
          <span>{'SCHEDULED '}</span>
          <span>
            {time && time.scheduled && time.scheduled.arrival && timezoneDestination
            && timezoneDestination.offset
            && getLocalData(time.scheduled.arrival, timezoneDestination.offset)
              .toString().slice(16, 21)}
          </span>
        </div>
        <div className="flight-info__timetable">
          <span>{'ESTIMATED '}</span>
          <span>
            {timeBoolean && time.estimated && time.estimated.arrival
            && getLocalData(time.estimated.arrival, timezoneDestination.offset)
              .toString().slice(16, 21)}
          </span>
        </div>
      </div>
      <Airborne />
    </section>
  );
};

export default FlightInfo;
