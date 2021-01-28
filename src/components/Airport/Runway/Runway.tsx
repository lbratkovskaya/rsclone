import React, { useState } from 'react';
import Arrow from '../../../img/Arrow';
import RunwayIcon from '../../../img/RunwayIcon';
import './Runway.scss';
import { RunwayProps } from '../../../types/airportDataTypes';

const Runway:React.FC<RunwayProps> = ({ satelliteImage, runways }: RunwayProps): JSX.Element => {
  const [openDetails, setOpenDetails] = useState(false);
  const collapseHandler = ():void => {
    setOpenDetails(!openDetails);
  };

  return (
    <div className="airport-runway">
      <p onClick={collapseHandler} role="presentation">
        <RunwayIcon />
        <span className={openDetails ? 'reverse' : ''}>Runway details</span>
        <Arrow />
      </p>
      <div className={openDetails ? 'airport-runway-info' : 'airport-runway-info collapse'}>
        <img src={satelliteImage} alt="satelliteImage" />
        <table>
          <thead>
            <tr>
              <th><span>Runway</span></th>
              <th>
                <span>Length</span>
                <span> (m/ft)</span>
              </th>
              <th><span>Surface</span></th>
            </tr>
          </thead>
          <tbody>
            {runways.map((item) => (
              <tr key={item.name}>
                <td><span>{item.name}</span></td>
                <td>
                  <span>
                    {item.length.m }
                    &nbsp;/&nbsp;
                    {item.length.ft}
                  </span>
                </td>
                <td><span>{item.surface.name}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Runway;
