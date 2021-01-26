import React, { useState, useEffect } from 'react';
import './Rating.scss';
import { RatingInfo } from '../../../types/types';

interface RatingProps {
  iata: string,
  name: string
}

const Rating:React.FC<RatingProps> = ({ iata, name }:RatingProps) => {
  const [ratingInfo, setRatingInfo] = useState< RatingInfo | null>(null);

  useEffect(() => {
    fetch(`/api/rating?airportCode=${iata}`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        document.documentElement.style.setProperty('--rating', data.rating.rating);
        setRatingInfo(data.rating);
      });
  }, [iata]);

  return (
    <>
      { ratingInfo
      && (
      <div className="airport-rating">
        <p>
          <span className="airport-rating__number">{ratingInfo.rating}</span>
          <span className="airport-rating__stars" />
        </p>
        <p>
          {ratingInfo.total}
          {' '}
          <span className="airport-rating__name">RSCloneFlightRadar</span>
          {' '}
          users have rated
          {' '}
          {name}
        </p>
      </div>
      )}
    </>
  );
};

export default Rating;
