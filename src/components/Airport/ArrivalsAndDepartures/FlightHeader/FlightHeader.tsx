import React from 'react';
import './FlightHeader.scss';
import { FlightHeaderProps } from '../../../../types/airportDataTypes';

const FlightHeader:React.FC<FlightHeaderProps> = ({ mode, date }: FlightHeaderProps)
: JSX.Element => (
  <p className="airport-flight-header">
    {mode.toUpperCase()}
    {' - '}
    {date.slice(0, 3).toUpperCase()}
    ,
    {date.slice(3, 8).toUpperCase()}
    {date.slice(8, 11) }
  </p>
);

export default FlightHeader;
