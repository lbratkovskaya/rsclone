import React, { useEffect, useState } from 'react';
import AircraftProgress from '../SVGComponents/AircraftProgress';
import getDistance from '../../../utils/getDistance';
import getFlightTime from '../../../utils/getFlightTime';
import { FlightProgressProps } from '../../../types/flightDataTypes';
import API from '../../../utils/API';
import './FlightProgress.scss';


const FlightProgress = ({
  startPoint, currentPoint, endPoint, currentTime, startTime, endTime, hexCode,
}
: FlightProgressProps): JSX.Element => {
  const [nowTime, setNowTime] = useState(currentTime);
  const [finalTime, setFinalTime] = useState(endTime);
  const [nowPoint, setNowPoint] = useState(currentPoint);
  const [finalPoint, setFinalPoint] = useState(endPoint);
  const coorBool = startPoint && nowPoint && endPoint;
  const timeBool = nowTime && startTime && finalTime;
  let behindDistance;
  let restDistance;
  let behindTime;
  let restTime;
  let distanceComplete: any;
  if (coorBool) {
    behindDistance = getDistance(startPoint.lat, nowPoint.lat,
      startPoint.lng, nowPoint.lng);
    restDistance = getDistance(nowPoint.lat, finalPoint.latitude,
      nowPoint.lng, finalPoint.longitude);
    distanceComplete = `${((+behindDistance / (+behindDistance + +restDistance)) * 100).toFixed()}%`;
  }
  if (timeBool) {
    behindTime = getFlightTime(startTime, nowTime);
    restTime = getFlightTime(nowTime, finalTime);
  }

  if (distanceComplete) {
    const lengthProgressBar = 283;
    const halfOfIcon = 19 / 2;
    const percent = +(distanceComplete.slice(0, -1));
    const icon = `${(lengthProgressBar * percent) / 100 - halfOfIcon}px `;
    document.documentElement.style.setProperty('--progress', icon);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      API.get(`/api/fly?flightCode=${hexCode}`, { method: 'GET' })
        .then((response) => response.data)
        .then((data) => {
          setNowTime(data.trail[0]?.ts);
          setFinalTime(data.time?.estimated?.arrival);
          setNowPoint(data.trail[0]);
          setFinalPoint(data.airport?.destination?.position);
        });
    }, 15000);
    return function cleanup() {
      clearInterval(intervalId);
    }
  }, [hexCode]);

  return (
    <section className="flight-progress">
      <div className="flight-progress__bar-wrapper">
        <div className="flight-progress__bar">
          {distanceComplete && (
          <div className="flight-progress__bar_complete" style={{ width: distanceComplete }}>
            <AircraftProgress />
          </div>
          )}
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
