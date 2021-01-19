import React from 'react';
import './Rating.scss';

interface RatingProps {
  icao: string,
  name: string
}

const Rating:React.FC<RatingProps> = ({ icao, name }:RatingProps) => {
  const newArr = icao.split('');
  let pseudoRandomNum = 0;
  for (let i = 0; i < newArr.length; i++) {
    pseudoRandomNum += newArr[i].charCodeAt(0);
  }
  const rating = (2 + (pseudoRandomNum % 30) / 10).toString();
  document.documentElement.style.setProperty('--rating', rating);

  return (
    <div className="airport-rating">
      <p>
        <span className="airport-rating__number">{rating}</span>
        <span className="airport-rating__stars" />
      </p>
      <p>
        {pseudoRandomNum}
        {' '}
        <span className="airport-rating__name">RSCloneFlightRadar</span>
        {' '}
        users have rated
        {' '}
        {name}
      </p>
    </div>
  );
};

export default Rating;
