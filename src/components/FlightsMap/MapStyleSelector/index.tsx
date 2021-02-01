import React from 'react';
import { KeyboardArrowLeft } from '@material-ui/icons';
import { MapStyleSelectorProps } from '../../../types/FlightsMapType';
import { MAP_STYLES } from '../../../utils/constants';

import './index.scss';

const MapStyleSelector = ({
  currentSelection,
  onStyleSelect,
}: MapStyleSelectorProps): JSX.Element => {
  const styleItems = MAP_STYLES.map(({ key, color, title }) => {
    const selectedStyle = currentSelection === key ? ' style-item__selected' : '';
    return (
      <div
        key={key}
        className={`style-item${selectedStyle}`}
        onClick={() => onStyleSelect(key)}
      >
        <span className="box" style={{ backgroundColor: `${color}` }} />
        <span className="text">{title}</span>
      </div>
    );
  });
  return (
    <section className="map-style-selector">
      <KeyboardArrowLeft />
      <div className="style-items-container">
        {styleItems}
      </div>
    </section>
  );
};

export default MapStyleSelector;
