import React from 'react';
import GoTo from '../SVGComponents/GoTo';
import { AircraftPhotoProps } from '../../../types/flightDataTypes';
import './AircraftPhoto.scss';

const AircraftPhoto:React.FC<AircraftPhotoProps> = ({ photo, photoLink }: AircraftPhotoProps)
: JSX.Element => (
  <div className="aircraft-photo">
    {photo && <img src={photo} alt="aircraft" />}
    {photoLink && (
    <a target="_blank" href={`${photoLink}`} rel="noreferrer">
      <GoTo />
    </a>
    )}
  </div>
);

export default AircraftPhoto;
