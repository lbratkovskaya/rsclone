import React, { useEffect, useState } from 'react';
import HeaderFlight from './HeaderFlight/HeaderFlight';
import AircraftPhoto from './AircraftPhoto/AircraftPhoto';
import FlightInfo from './FlightInfo/FlightInfo';
import FlightProgress from './FlightProgress/FlightProgress';
import './Flight.scss';

interface FlightPanelProps {
  hexCode: string
  openFlightPanel: boolean,
}

type FlightInfoObject = any;

const FlightPanel = ({ hexCode, openFlightPanel }:FlightPanelProps):JSX.Element => {
  const [flightInfo, setFlightInfo] = useState<FlightInfoObject | null>(null);
  const [openPanel, setOpenPanel] = useState(openFlightPanel);

  const closeHandler = () => {
    setOpenPanel(false);
  };

  useEffect(() => {
    fetch(`/api/fly?flightCode=${hexCode}`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, [hexCode]);

  useEffect(() => {
    fetch(`/api/fly?flightCode=${hexCode}`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => setFlightInfo(data));
  }, [hexCode]);

  return (
    <div className="flight" style={{ transform: openPanel ? 'translateX(0)' : 'translateX(-100vw)' }}>
      {flightInfo && (
      <>
        <HeaderFlight
          number={flightInfo.identification.number.default}
          callsign={flightInfo.identification.callsign}
          airline={flightInfo.airline.name}
          closeHandler={closeHandler}
        />
        <AircraftPhoto
          photo={flightInfo.aircraft.images.large[0].src}
          photoLink={flightInfo.aircraft.images.large[0].link}
        />
        <FlightInfo
          iataOrigin={flightInfo.airport.origin.code.iata}
          cityOrigin={flightInfo.airport.origin.position.region.city}
          iataDestination={flightInfo.airport.destination.code.iata}
          cityDestination={flightInfo.airport.destination.position.region.city}
          timezoneOrigin={flightInfo.airport.origin.timezone}
          timezoneDestination={flightInfo.airport.destination.timezone}
          time={flightInfo.time}
        />
        <FlightProgress trail={flightInfo.trail}/>
      </>
      )}
    </div>
  );
};

export default FlightPanel;
