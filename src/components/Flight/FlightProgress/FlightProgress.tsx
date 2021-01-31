import React from 'react';
import AircraftProgress from '../SVGComponents/AircraftProgress';
import './FlightProgress.scss';
import getDistance from '../../../utils/getDistance';
import getFlightTime from '../../../utils/getFlightTime';

interface FlightProgressProps {
  startPoint: any,
  currentPoint: any,
  endPoint: any,
  currentTime: number,
  startTime: number,
  endTime: number,
}

const FlightProgress = ({
  startPoint, currentPoint, endPoint, currentTime, startTime, endTime,
}
: FlightProgressProps): JSX.Element => {
  const widthComplete = '50%';
  const icon = '132px';
  document.documentElement.style.setProperty('--progress', icon);

  const behindDistance = getDistance(startPoint.lat, currentPoint.lat,
    startPoint.lng, currentPoint.lng);
  const restDistance = getDistance(currentPoint.lat, endPoint.latitude,
    currentPoint.lng, endPoint.longitude);
  const behindTime = getFlightTime(startTime, currentTime);
  const restTime = getFlightTime(currentTime, endTime);
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
          <span>
            {behindDistance}
            {' '}
            km
          </span>
          <span>
            {' ,'}
            {behindTime}
            {' '}
            ago
          </span>
        </div>
        <div>
          <span>
            {restDistance}
            {' '}
            km
          </span>
          <span>
            {', in '}
            {restTime}
          </span>
        </div>
      </div>
    </section>
  );
};

export default FlightProgress;
