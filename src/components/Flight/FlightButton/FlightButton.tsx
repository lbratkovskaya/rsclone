import React, { useState } from 'react';
import Follow from '../SVGComponents/Follow';
import { FlightButtonProps } from '../../../types/flightDataTypes';
import './FlightButton.scss';

const FlightButton:React.FC<FlightButtonProps> = ({ toggleSelectedFlights, isFollowed }
: FlightButtonProps): JSX.Element => {
  const [clicked, setClicked] = useState(isFollowed);
  const handleTab = () => {
    setClicked(!clicked);
    toggleSelectedFlights(!clicked);
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
