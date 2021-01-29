import React from 'react';
import General from '../SVGComponents/General';
import Arrivals from '../SVGComponents/Arrivals';
import Departures from '../SVGComponents/Departures';
import { ButtonProps } from '../../../types/airportDataTypes';
import './Button.scss';

const Button:React.FC<ButtonProps> = ({
  num, name, active, changeTabHandler,
}: ButtonProps) => {
  const handleTab = (e:React.MouseEvent<HTMLButtonElement>) => {
    if (!(e.target instanceof HTMLButtonElement || e.target instanceof SVGElement)) {
      return;
    }
    const tabHandlerTarget = (e.target instanceof HTMLButtonElement)
      ? +e.target.dataset.name : +e.target.parentElement.dataset.name;
    changeTabHandler(tabHandlerTarget);
  };

  let icon;
  if (num === 1) {
    icon = <General />;
  } else if (num === 2) {
    icon = <Arrivals />;
  } else {
    icon = <Departures />;
  }

  return (
    <button
      type="button"
      data-name={num}
      className={`airport-button ${active === num ? 'airport-button-active' : ''}`}
      name={name}
      onClick={handleTab}
    >
      {icon}
      {name}
    </button>
  );
};

export default Button;
