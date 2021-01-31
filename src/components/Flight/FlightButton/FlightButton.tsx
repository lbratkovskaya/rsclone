import React, { useState } from 'react';
import Follow from '../SVGComponents/Follow';
import './FlightButton.scss';

const FlightButton = (): JSX.Element => {
  const [clicked, setClicked] = useState(false);
  const handleTab = () => {
    setClicked(!clicked);
  };

  return (
    <button
      type="button"
      className={`flight-button ${clicked ? 'flight-button_active' : ''}`}
      onClick={handleTab}
    >
      <Follow />
      <span>Follow</span>
    </button>
  );
};

export default FlightButton;
