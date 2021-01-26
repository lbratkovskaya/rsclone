import React from 'react';
import './OneFlight.scss';
import getLocalData from '../../../../utils/getLocalData';

interface OneFlightProps {
  time: number,
  offset: number,
  airlineCodeIata: string,
  airlineCodeIcao: string,
  airportTo: string,
  airportToCode: string,
  aircraftNumber: string,
  aircraftModel: string
}

const OneFlight:React.FC<OneFlightProps> = ({
  time, offset,
  aircraftModel, aircraftNumber, airportTo, airlineCodeIcao, airportToCode,
  airlineCodeIata,
}:OneFlightProps): JSX.Element => {
  const date = getLocalData(time, offset).toString();
  return (
    <div className="airport-flight">
      <div className="airport-flight__time">
        <span>{date.slice(16, 21)}</span>
        <span>Scheduled</span>
      </div>
      <div className="airport-flight__airlineLogo">
        <img src={`https://cdn.flightradar24.com/assets/airlines/logotypes/${airlineCodeIata}_${airlineCodeIcao}.png`} alt="logo" />
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
