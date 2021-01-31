import React from 'react';
import AltitudeIcon from '../SVGComponents/AltitudeIcon';
import '../Flight.scss';
import './Altitude.scss';

interface AltitueProps {
  alt: number | null,
  hd: number | null,
}

const Altitude:React.FC<AltitueProps> = ({ alt, hd }: AltitueProps): JSX.Element => (
  <section className="flight-altitude">
    <div className="flight-altitude__icon"><AltitudeIcon /></div>
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
