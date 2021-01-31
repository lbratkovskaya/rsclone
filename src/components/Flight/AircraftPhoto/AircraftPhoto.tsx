import React from 'react';
import GoTo from '../SVGComponents/GoTo';
import './AircraftPhoto.scss';

interface AircraftPhotoProps {
  photo: string
  photoLink: string
}

const AircraftPhoto:React.FC<AircraftPhotoProps> = ({ photo, photoLink }:AircraftPhotoProps)
:JSX.Element => (
  <div className="aircraft-photo">
    <img src={photo} alt="aircraft" />
    <a target="_blank" href={`${photoLink}`} rel="noreferrer">
      <GoTo />
    </a>
  </div>
);

export default AircraftPhoto;
