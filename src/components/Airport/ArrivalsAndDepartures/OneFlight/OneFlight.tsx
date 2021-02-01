import React from 'react';
import './OneFlight.scss';
import getLocalData from '../../../../utils/getLocalData';
import { OneFlightProps } from '../../../../types/airportDataTypes';
import { firstLogoUrl, secondLogoUrl, noLogoUrl } from '../../../../utils/airportApiUtils';

const OneFlight:React.FC<OneFlightProps> = ({
  time,
  offset,
  aircraftModel,
  aircraftNumber,
  airportTo,
  airlineCodeIcao,
  airportToCode,
  airlineCodeIata,
}:OneFlightProps): JSX.Element => {
  const date = getLocalData(time, offset).toString();
  const img = document.createElement('img');
  img.src = firstLogoUrl(airlineCodeIata, airlineCodeIcao);
  img.onerror = () => {
    img.src = secondLogoUrl(airlineCodeIata);
  };
  img.onerror = () => {
    img.src = noLogoUrl;
  };

  return (
    <div className="airport-flight">
      <div className="airport-flight__time">
        <span>{date.slice(16, 21)}</span>
        <span>Scheduled</span>
      </div>
      <div className="airport-flight__airlineLogo">
        <img src={img.src} alt="logo" />
      </div>
      <div className="airport-flight__flightInformation">
        <div className="airport-flight__flightInformation-airport">
          <span>
            {airportTo || 'N/A'}
            &nbsp;
          </span>
          <span>
            (
            {airportToCode || 'N/A'}
            )
          </span>
        </div>
        <div className="airport-flight__flightInformation-aircraft">
          <span>{aircraftNumber || 'N/A'}</span>
          <span>
            (
            {aircraftModel || 'N/A'}
            )
          </span>
        </div>
      </div>
    </div>
  );
};

export default OneFlight;
