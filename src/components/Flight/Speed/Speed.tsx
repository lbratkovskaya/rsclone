import React from 'react';
import Speedmeter from '../SVGComponents/Speedmeter';
import './Speed.scss';

interface SpeedProps {
  spd: number,
}

const Speed:React.FC<SpeedProps> = ({ spd }: SpeedProps): JSX.Element => {
  const km = spd * 1.85;
  const mph = spd * 1.15;
  return (
    <section className="flight-speed">
      <div className="flight-speed__icon"><Speedmeter /></div>
      <div className="flex-wrapper">
        <p>GROUND SPEED</p>
        <p
          className="flight-speed__bold"
          data-tooltip-value={`${km.toFixed(0)} km/h, ${mph.toFixed(0)} mph`}
        >
          {spd}
          {' '}
          kts
        </p>
      </div>
    </section>
  );
}

export default Speed;
