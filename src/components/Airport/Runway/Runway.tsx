import React, { useState } from 'react';
import Arrow from '../SVGComponents/Arrow';
import RunwayIcon from '../SVGComponents/RunwayIcon';
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
      <div className={`airport-runway-info ${openDetails ? '' : 'collapse'}`}>
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
            {runways && runways.map((item) => (
              <tr key={item.name || 'N/A'}>
                <td><span>{item.name || 'N/A'}</span></td>
                <td>
                  <span>
                    {item.length?.m || 'N/A'}
                    &nbsp;/&nbsp;
                    {item.length?.ft || 'N/A'}
                  </span>
                </td>
                <td><span>{item.surface?.name || 'N/A'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Runway;
