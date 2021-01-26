import React from 'react';
import { AirportInfo } from '../../../types/types';
import GoTo from '../../../img/Goto';
import './AirportPhoto.scss';

interface AirportPhotoProps {
  airportInfo: AirportInfo
}

const AirportPhoto:React.FC<AirportPhotoProps> = ({ airportInfo }:AirportPhotoProps)
:JSX.Element => (
  <div className="airport-photo">
    <img src={airportInfo.airportImages.large[0].src} alt="airport" />
    <a target="_blank" href={`${airportInfo.airportImages.large[0].link}`} rel="noreferrer">
      <GoTo />
    </a>
  </div>
);

export default AirportPhoto;
