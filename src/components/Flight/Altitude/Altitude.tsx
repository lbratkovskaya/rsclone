import React from 'react';
import AltitudeIcon from '../SVGComponents/AltitudeIcon';
import { AltitudeProps } from '../../../types/flightDataTypes';
import '../Flight.scss';
import './Altitude.scss';

const Altitude:React.FC<AltitudeProps> = ({ alt, hd }: AltitudeProps): JSX.Element => (
  <section className="flight-altitude">
    <div className="flight-altitude__icon">
      <AltitudeIcon />
    </div>
    <div className="flex-wrapper">
      <div className="first-column">
        <p>CALIBRATED ALTITUDE</p>
        <p className="flight-altitude__bold">
          {alt && `${alt} ft`}
        </p>
      </div>
      <div>
        <p>TRACK</p>
        <p className="flight-altitude__bold">
          {hd && `${hd} °`}
        </p>
      </div>
    </div>
  </section>
);

export default Altitude;
