import React from 'react';
import General from '../../../img/General';
import Arrivals from '../../../img/Arrivals';
import Departures from '../../../img/Departures';
import './Button.scss';

type ChangeTabHandler = (num: number) => void;

interface ButtonProps {
  num: number,
  name: string,
  active: number,
  changeTabHandler:ChangeTabHandler
}

const Button:React.FC<ButtonProps> = ({
  num, name, active, changeTabHandler,
}:ButtonProps) => {
  const handleTab = (e:React.MouseEvent<HTMLButtonElement>) => {
    if (!(e.target instanceof HTMLButtonElement || e.target instanceof SVGElement)) {
      return;
    }
    if (e.target instanceof HTMLButtonElement) {
      changeTabHandler(+e.target.dataset.name);
    }
    if (e.target instanceof SVGElement) {
      changeTabHandler(+e.target.parentElement.dataset.name);
    }
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
      className={active === num ? 'airport-button airport-button-active' : 'airport-button'}
      name={name}
      onClick={handleTab}
    >
      {icon}
      {name}
    </button>
  );
};

export default Button;
