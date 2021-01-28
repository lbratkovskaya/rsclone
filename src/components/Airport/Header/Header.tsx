import React from 'react';
import { HeaderProps } from '../../../types/airportDataTypes';
import Close from '../../../img/Close';
import './Header.scss';
import getLocalData from '../../../utils/getLocalData';

const Header:React.FC<HeaderProps> = ({ airportInfo, closeHandler } :HeaderProps) => {
  const flagUrl = `https://www.countryflags.io/${airportInfo.position.country.code}/flat/64.png`;

  const localTime = getLocalData((new Date().getTime()) / 1000,
    airportInfo.timezone.offset).toString();

  const hours = airportInfo.timezone.offset / 3600;
  let UTCTime = (hours) < 10 ? `0${hours}`
    : hours;
  if (hours > -1 && hours < 10) {
    UTCTime = `0${hours}`;
  } else if (hours < -1 && hours > -10) {
    UTCTime = `-0${Math.abs(hours)}`;
  } else {
    UTCTime = hours;
  }

  return (
    <div className="airport-header">
      <div className="panel-close" onClick={closeHandler} aria-hidden="true">
        <Close />
      </div>
      <h3 className="airport-header__name">{airportInfo.name}</h3>
      <p className="airport-header__description">
        <img src={flagUrl} className="airport-header__flag" alt="flag" />
        <span>
          {airportInfo.code.iata}
          /
          {airportInfo.code.icao}
        </span>
      </p>
      <p className="airport-header__time">
        <span>
          {localTime.slice(16, 21)}
        </span>
        <span>
          {airportInfo.timezone.abbr}
          &nbsp;
          (UTC&nbsp;
          {UTCTime}
          :00
          )
        </span>
        <span className="separator">|</span>
        <span className="airport-header_bordered">
          {localTime.slice(4, 7)}
          &nbsp;
          {localTime.slice(8, 10)}
        </span>
        <span className="separator">|</span>
        <span>
          Elev.
          {airportInfo.position.elevation}
          ft
        </span>
      </p>
    </div>
  );
};

export default Header;
