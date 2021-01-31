import React from 'react';
import AircraftProgress from '../SVGComponents/AircraftProgress';
import './FlightProgress.scss';
import getDistance from '../../../utils/getDistance';
import getFlightTime from '../../../utils/getFlightTime';

type Point = {
  alt?: number | null,
  hd?: number | null,
  lat?: number | null,
  lng?: number | null,
  spd?: number | null,
  ts?: number | null,
};

type EndPoint = {
  altitude?: number | null,
  country?: any,
  latitude?: number | null,
  longitude?: number | null,
  region?: any,
};
interface FlightProgressProps {
  startPoint: Point | null,
  currentPoint: Point | null,
  endPoint: EndPoint | null,
  currentTime: number | null,
  startTime: number | null,
  endTime: number | null,
}

const FlightProgress = ({
  startPoint, currentPoint, endPoint, currentTime, startTime, endTime,
}
: FlightProgressProps): JSX.Element => {
  const widthComplete = '50%';
  const icon = '132px';
  document.documentElement.style.setProperty('--progress', icon);
  const coorBool = startPoint && currentPoint && endPoint;
  const timeBool = currentTime && startTime && endTime;
  let behindDistance;
  let restDistance;
  let behindTime;
  let restTime;
  if (coorBool) {
    behindDistance = getDistance(startPoint.lat, currentPoint.lat,
      startPoint.lng, currentPoint.lng);
    restDistance = getDistance(currentPoint.lat, endPoint.latitude,
      currentPoint.lng, endPoint.longitude);
  }
  if (timeBool) {
    behindTime = getFlightTime(startTime, currentTime);
    restTime = getFlightTime(currentTime, endTime);
  }

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
            {behindDistance && `${behindDistance} km`}
          </span>
          <span>
            {behindTime && `, ${behindTime} ago`}
          </span>
        </div>
        <div>
          <span>
            {restDistance && `${restDistance} km`}
          </span>
          <span>
            {restTime && `, in ${restTime}`}
          </span>
        </div>
      </div>
    </section>
  );
};

export default FlightProgress;
