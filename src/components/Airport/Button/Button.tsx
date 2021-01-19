import React from 'react';
import General from '../images/General';
import Arrivals from '../images/Arrivals';
import Departures from '../images/Departures';

type ChangeTabHandler = (num: number) => void;

interface ButtonProps {
  num: number,
  name: string,
  changeTabHandler:ChangeTabHandler
}

const Button:React.FC<ButtonProps> = ({
  num, name, changeTabHandler,
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
    <button type="button" data-name={num} className="airport-button" name={name} onClick={handleTab}>
      {icon}
      {name}
    </button>
  );
};

export default Button;
