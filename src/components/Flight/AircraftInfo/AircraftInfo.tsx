import React from 'react';
import Aircraft from '../SVGComponents/Aircraft';
import { firstLogoUrl, secondLogoUrl, noLogoUrl } from '../../../utils/airportApiUtils';
import '../Flight.scss';
import './AircraftInfo.scss';

interface AircraftInfoProps {
  model: {
    code?: string | null,
    text?: string | null,
  }
  registration: string,
  airline: {
    iata?: string | null,
    icao?: string | null,
  }
}

const AircraftInfo:React.FC<AircraftInfoProps> = ({ model, registration, airline }
: AircraftInfoProps): JSX.Element => {
  const img = document.createElement('img');
  img.src = firstLogoUrl(airline.iata, airline.icao);
  img.onerror = () => {
    img.src = secondLogoUrl(airline.iata);
  };
  img.onerror = () => {
    img.src = noLogoUrl;
  };

  return (
    <section className="flight-aircraft-info">
      <div className="flight-aircraft-info__icon"><Aircraft /></div>
      <div className="flex-wrapper">
        <div className="row-no-flex">
          <p>
            AIRCRAFT TYPE
            {' ('}
            <span>
              {model.code ? model.code : 'N/A'}
              {') '}
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
            <img src={img.src} alt="logo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AircraftInfo;
