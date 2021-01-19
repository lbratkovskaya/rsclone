import React from 'react';

type Urls = {
  webSite: string,
  wikipedia:string,
  twitter:string,
  googleMaps:string,
  flightRadar:string
};

interface InfolinksProps {
  links: Urls
}

const Infolinks:React.FC<InfolinksProps> = ({ links }:InfolinksProps) => (
  <div className="airport-infoLinks">
    <p>Find more info:</p>
    <ul>
      <li><a href={links.webSite} target="_blank">WebSite</a></li>
      <li><a href={links.googleMaps} target="_blank">GoogleMaps</a></li>
      <li><a href={links.twitter} target="_blank">Twitter</a></li>
    </ul>
  </div>
);

export default Infolinks;
