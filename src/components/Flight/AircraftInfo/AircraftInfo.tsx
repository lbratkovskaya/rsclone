import React, { useState} from 'react';
import Aircraft from '../SVGComponents/Aircraft';
import { firstLogoUrl, secondLogoUrl, noLogoUrl } from '../../../utils/airportApiUtils';
import { AircraftInfoProps } from '../../../types/flightDataTypes';
import '../Flight.scss';
import './AircraftInfo.scss';

const AircraftInfo:React.FC<AircraftInfoProps> = ({ model, registration, airline }
: AircraftInfoProps): JSX.Element => {
  let firstUrl: string;
  if (airline.iata && airline.icao) {
    firstUrl = firstLogoUrl(airline.iata, airline.icao);
  } else if (airline.iata) {
    firstUrl = secondLogoUrl(airline.iata);
  } else {
    firstUrl = noLogoUrl;
  }
  const [logoUrl, setLogoUrl] = useState(firstUrl);
  const handleError = () => {
    if (logoUrl === firstUrl) {
      const secondUrl = secondLogoUrl(airline.iata);
      setLogoUrl(secondUrl);
    } else {
      setLogoUrl(noLogoUrl);
    }
  };

  return (
    <section className="flight-aircraft-info">
      <div className="flight-aircraft-info__icon"><Aircraft /></div>
      <div className="flex-wrapper">
        <div className="row-no-flex">
          <p>
            AIRCRAFT TYPE
            <span>
              {` (${model.code ? model.code : 'N/A'}) `}
            </span>
          </p>
          <p className="flight-aircraft-info__bold">{model.text || ''}</p>
        </div>
        <div className="row">
          <div className="first-column">
            <p>REGISTRATION</p>
            <p className="flight-aircraft-info__bold">{registration || ''}</p>
          </div>
          <div>
            <img src={logoUrl} onError={handleError} alt="logo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AircraftInfo;
