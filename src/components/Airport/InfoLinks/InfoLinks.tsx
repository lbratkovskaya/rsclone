import React from 'react';
import { InfoLinksProps } from '../../../types/airportDataTypes';

const InfoLinks:React.FC<InfoLinksProps> = ({ links }: InfoLinksProps) => (
  <div className="airport-infoLinks">
    <p>Find more info:</p>
    <ul>
      <li><a href={links.webSite} target="_blank" rel="noreferrer">WebSite</a></li>
      <li><a href={links.googleMaps} target="_blank" rel="noreferrer">GoogleMaps</a></li>
      <li><a href={links.twitter} target="_blank" rel="noreferrer">Twitter</a></li>
    </ul>
  </div>
);

export default InfoLinks;
