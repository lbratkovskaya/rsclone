import React from 'react';
import Aircraft from '../SVGComponents/Aircraft';
import '../Flight.scss';
import './AircraftInfo.scss';

interface AircraftInfoProps {
  model: {
    code: string,
    text: string,
  }
  registration: string,
  airline: {
    iata: string,
    icao: string,
  }
}

const AircraftInfo:React.FC<AircraftInfoProps> = ({ model, registration, airline }
: AircraftInfoProps): JSX.Element => {
  const img = document.createElement('img');
  let isLoadedFromFirst = false;
  img.src = `https://cdn.flightradar24.com/assets/airlines/logotypes/${airline.iata}_${airline.icao}.png`;
  img.onload = () => {
    isLoadedFromFirst = true;
  };

  if (!isLoadedFromFirst) {
    img.src = `https://content.airhex.com/content/logos/airlines_${airline.iata}_60_20_r.png`;
  }

  return (
    <section className="flight-aircraft-info">
      <div className="flight-aircraft-info__icon"><Aircraft /></div>
      <div className="flex-wrapper">
        <div className="row-no-flex">
          <p>
            AIRCRAFT TYPE
            {' ('}
            <span>
              {model.code}
              {') '}
            </span>
          </p>
          <p className="flight-aircraft-info__bold">{model.text}</p>
        </div>
        <div className="row">
          <div className="first-column">
            <p>REGISTRATION</p>
            <p className="flight-aircraft-info__bold">{registration}</p>
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
