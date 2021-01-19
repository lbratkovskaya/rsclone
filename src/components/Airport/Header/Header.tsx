import React, { useEffect, useState } from 'react';
import { TargetAirport } from '../../../types';
import countriesDifferent from '../countriesDifferent';
import Close from '../images/Close';
import './Header.scss';

type Month = {
  [key: string] :string
};

// interface HeaderProps {
//   airportInfo: TargetAirport2,
//   time: string,
//   name: string
// }

interface HeaderProps {
  targetAirport: TargetAirport
}

const Header:React.FC<HeaderProps> = ({ targetAirport }:HeaderProps) => {
  const [flagUrl, setFlagUrl] = useState('');

  // const flagUrl = `https://www.countryflags.io/${airportInfo.country.code}/flat/64.png`
  const month: Month = {
    '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'June', '07': 'July', '08': 'Aug', '09': 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec',
  };
  let { country } = targetAirport;
  if (countriesDifferent[country]) {
    country = countriesDifferent[country];
  }

  const closePanel = (e:React.MouseEvent<HTMLDivElement>) => {
    console.log(e.target, 5);
  };

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all?fields=name;population;flag')
      .then((response) => response.json())
      .then((data) => data.filter((el: any) => el.name === country))
      .then((data) => setFlagUrl(data[0].flag));
  });

  return (
    <div className="airport-header">
      <div className="panel-close" onClick={closePanel} aria-hidden="true">
        <Close />
      </div>
      <h3 className="airport-header__name">{targetAirport.name}</h3>
      <p className="airport-header__description">
        <img src={flagUrl} className="airport-header__flag" alt="flag" />
        <span>
          {targetAirport.iata}
          /
          {targetAirport.icao}
        </span>
      </p>
      <p className="airport-header__time">
        {/* <span>{time.slice(11,16)} UTC({time.slice(19)})</span>
        <span>{month[time.slice(5,7)]} {time.slice(8,10)}</span> */}
      </p>
    </div>
  );
};

export default Header;
