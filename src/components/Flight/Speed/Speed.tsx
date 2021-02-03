import React from 'react';
import Speedmeter from '../SVGComponents/Speedmeter';
import { SpeedProps } from '../../../types/flightDataTypes';
import './Speed.scss';

const Speed:React.FC<SpeedProps> = ({ spd }: SpeedProps): JSX.Element => {
  const km = spd && spd * 1.85;
  const mph = spd && spd * 1.15;
  return (
    <>
      {spd && (
      <section className="flight-speed">
        <div className="flight-speed__icon"><Speedmeter /></div>
        <div className="flex-wrapper">
          <p>GROUND SPEED</p>
          <p
            className="flight-speed__bold"
            data-tooltip-value={`${km.toFixed(0)} km/h, ${mph.toFixed(0)} mph`}
          >
            {`${spd} kts`}
          </p>
        </div>
      </section>
      ) }
    </>
  );
};

export default Speed;
