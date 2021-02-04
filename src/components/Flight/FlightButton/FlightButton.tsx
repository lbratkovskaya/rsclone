import React, { useState } from 'react';
import Follow from '../SVGComponents/Follow';
import { FlightButtonProps } from '../../../types/flightDataTypes';
import './FlightButton.scss';

const FlightButton: React.FC<FlightButtonProps> = ({ toggleSelectedFlights, isFollowed }
  : FlightButtonProps): JSX.Element => {
  const handleTab = () => {
    toggleSelectedFlights(!isFollowed);
  };

  return (
    <button
      type="button"
      className={`flight-button ${isFollowed ? 'flight-button_active' : ''}`}
      onClick={handleTab}
    >
      <Follow />
      <span>Follow</span>
    </button>
  );
};

export default FlightButton;
