import React from 'react';
import './OneFlight.scss';
import getLocalData from '../../../../utils/getLocalData';
import { OneFlightProps } from '../../../../types/airportDataTypes';

const OneFlight:React.FC<OneFlightProps> = ({
  time, offset,
  aircraftModel, aircraftNumber, airportTo, airlineCodeIcao, airportToCode,
  airlineCodeIata,
}:OneFlightProps): JSX.Element => {
  const date = getLocalData(time, offset).toString();
  const image = `https://cdn.flightradar24.com/assets/airlines/logotypes/${airlineCodeIata}_${airlineCodeIcao}.png`;
  return (
    <div className="airport-flight">
      <div className="airport-flight__time">
        <span>{date.slice(16, 21)}</span>
        <span>Scheduled</span>
      </div>
      <div className="airport-flight__airlineLogo">
        <img src={image} alt="logo" />
      </div>
      <div className="airport-flight__flightInformation">
        <div className="airport-flight__flightInformation-airport">
          <span>
            {airportTo}
            &nbsp;
          </span>
          <span>
            (
            {airportToCode}
            )
          </span>
        </div>
        <div className="airport-flight__flightInformation-aircraft">
          <span>{aircraftNumber}</span>
          <span>
            (
            {aircraftModel}
            )
          </span>
        </div>
      </div>
    </div>
  );
};

export default OneFlight;
