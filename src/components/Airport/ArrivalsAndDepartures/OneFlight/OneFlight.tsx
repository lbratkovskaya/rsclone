import React, { useState } from 'react';
import getLocalData from '../../../../utils/getLocalData';
import { OneFlightProps } from '../../../../types/airportDataTypes';
import { firstLogoUrl, secondLogoUrl, noLogoUrl } from '../../../../utils/airportApiUtils';
import './OneFlight.scss';

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
  let firstUrl: string;
  if (airlineCodeIata && airlineCodeIcao) {
    firstUrl = firstLogoUrl(airlineCodeIata, airlineCodeIcao);
  } else if (airlineCodeIata) {
    firstUrl = secondLogoUrl(airlineCodeIata);
  } else {
    firstUrl = noLogoUrl;
  }
  const [logoUrl, setLogoUrl] = useState(firstUrl);
  const handleError = () => {
    if (logoUrl === firstUrl) {
      const secondUrl = secondLogoUrl(airlineCodeIata);
      setLogoUrl(secondUrl);
    } else {
      setLogoUrl(noLogoUrl);
    }
  };

  return (
    <div className="airport-flight">
      <div className="airport-flight__time">
        <span>{date.slice(16, 21)}</span>
        <span>Scheduled</span>
      </div>
      <div className="airport-flight__airlineLogo">
        <img src={logoUrl} onError={handleError} alt="logo" />
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
