import React from 'react';
import { HeaderProps } from '../../../types/airportDataTypes';
import Close from '../SVGComponents/Close';
import { addZeroToTimes, getLocalData } from '../../../utils';
import './Header.scss';

const Header:React.FC<HeaderProps> = ({ airportInfo, closeHandler } :HeaderProps) => {
  const flagUrl = `https://www.countryflags.io/${airportInfo.position.country.code}/flat/64.png`;
  // const flagUrl = `/api/flag?countryCode=${airportInfo.position.country.code}`;

  const localTime = getLocalData((new Date().getTime()) / 1000,
    airportInfo?.timezone?.offset).toString();

  return (
    <div className="airport-header">
      <div className="panel-close" onClick={closeHandler} aria-hidden="true">
        <Close />
      </div>
      <h3 className="airport-header__name">{airportInfo.name || 'N/A'}</h3>
      <p className="airport-header__description">
        <img src={flagUrl} className="airport-header__flag" alt="flag" />
        <span>
          {airportInfo.code.iata || 'N/A'}
          /
          {airportInfo.code.icao || 'N/A'}
        </span>
      </p>
      <p className="airport-header__time">
        <span>
          {localTime && localTime.slice(16, 21)}
        </span>
        <span>
          {airportInfo.timezone.abbr || 'N/A'}
          &nbsp;
          (UTC&nbsp;
          {addZeroToTimes(airportInfo.timezone.offset)}
          :00
          )
        </span>
        <span className="separator">|</span>
        <span className="airport-header_bordered">
          {localTime && localTime.slice(4, 7)}
          &nbsp;
          {localTime && localTime.slice(8, 10)}
        </span>
        <span className="separator">|</span>
        <span>
          Elev.
          {airportInfo.position.elevation || 'N/A'}
          ft
        </span>
      </p>
    </div>
  );
};

export default Header;
