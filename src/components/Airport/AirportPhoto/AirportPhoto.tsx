import React from 'react';
import { AirportPhotoProps } from '../../../types/airportDataTypes';
import GoTo from '../SVGComponents/Goto';
import './AirportPhoto.scss';

const AirportPhoto:React.FC<AirportPhotoProps> = ({ airportInfo }: AirportPhotoProps)
: JSX.Element => {
  let { src, link } = airportInfo?.airportImages?.large[0] || {};

  src = src || 'https://www.flightradar24.com/static/images/no-ap-img.jpg';
  link = link || 'https://www.jetphotos.com/';

  return (
    <div className="airport-photo">
      <img src={src} alt="airport" />
      {link && (
      <a target="_blank" href={link} rel="noreferrer">
        <GoTo />
      </a>
      )}
    </div>
  );
};

export default AirportPhoto;
