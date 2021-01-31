import React from 'react';
// import { HeaderFlightPanelProps } from '../../../types/flightDataTypes';
import './HeaderFlight.scss';
import Close from '../SVGComponents/Close';

interface HeaderFlightPanelProps {
  number: string,
  callsign: string,
  airline: string,
  closeHandler: () => void,
}

const HeaderFlight:React.FC<HeaderFlightPanelProps> = ({
  number,
  callsign,
  airline,
  closeHandler,
}:HeaderFlightPanelProps)
:JSX.Element => (
  <div className="flight-header">
    <div className="panel-close" onClick={closeHandler} aria-hidden="true">
      <Close />
    </div>
    <h3 className="flight-header__name">
      <span>{number}</span>
      <span>
        { ` /${callsign}`}
      </span>
    </h3>
    <p>{airline}</p>
  </div>
);

export default HeaderFlight;
