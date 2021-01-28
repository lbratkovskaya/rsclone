import React from 'react';
import AircraftProgress from '../../../img/AircraftProgress';
import './FlightProgress.scss';

interface FlightProgressProps {
  trail: any
}

const FlightProgress = ({ trail }: FlightProgressProps): JSX.Element => {
  const widthComplete = '50%';
  const icon = '132px';
  document.documentElement.style.setProperty('--progress', icon);

  const R = 6371; // Earth's radius
  const sin1 = Math.sin((((33.94252 - 44.142975) * Math.PI) / 180) / 2);
  const sin2 = Math.sin((((-118.410789 - 28.082951) * Math.PI) / 180) / 2);
  console.log(2 * R * Math.asin(Math.sqrt(sin1 * sin1 + sin2 * sin2 * Math.cos((33.94252 * Math.PI)
   / 180) * Math.cos((44.142975 * Math.PI) / 180))));

  return (
    <section className="flight-progress">
      <div className="flight-progress__bar-wrapper">
        <div className="flight-progress__bar">
          <div className="flight-progress__bar_complete" style={{ width: widthComplete }}>
            <AircraftProgress />
          </div>
        </div>
      </div>
      <div className="flight-progress__distance">
        <div>
          <span>5,951 km</span>
          <span>, 06:23 ago</span>
        </div>
        <div>
          <span>3,538 km</span>
          <span>, in 03:56</span>
        </div>
      </div>
    </section>
  );
};

export default FlightProgress;
