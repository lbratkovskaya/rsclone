import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import AirportPhoto from './AirportPhoto/AirportPhoto';
import Rating from './Rating/Rating';
import Weather from './Weather/Weather';
import Runway from './Runway/Runway';
import Button from './Button/Button';
import ScheduledFlights from './ScheduledFlights/ScheduledFlights';
import ArrivalsAndDepartures from './ArrivalsAndDepartures/ArrivalsAndDepartures';
import { AirportInfo, Schedule, Runways } from '../../types/types';
import './Airport.scss';

interface AirportProps {
  code: string,
  openAirportPanel: boolean,
}

type ChangeTabHandler = (num: number) => void;

const Airport:React.FC<AirportProps> = ({
  code, openAirportPanel,
}:AirportProps) => {
  const [airportInfo, setAirportInfo] = useState< AirportInfo | null>(null);
  const [schedule, setSchedule] = useState< Schedule | null>(null);
  const [runways, setRunways] = useState< Runways[] | null>(null);
  const [satelliteImage, setSatelliteImage] = useState('');
  const [activeTab, setActiveTab] = useState(1);
  const [openPanel, setOpenPanel] = useState(openAirportPanel);

  const changeTabHandler:ChangeTabHandler = (num) => {
    setActiveTab(num);
  };

  const buttons = [
    { num: 1, name: 'General' },
    { num: 2, name: 'Arrivals' },
    { num: 3, name: 'Departures' },
  ];

  useEffect(() => {
    fetch(`/api/airport?airportCode=${code}`, { method: 'GET', mode: 'no-cors' })
      .then((response) => response.json())
      .then((data) => {
        const airportData = data.result.response.airport.pluginData.details;
        const scheduleData = data.result.response.airport.pluginData.scheduledRoutesStatistics;
        const runwaysData = data.result.response.airport.pluginData.runways;
        const satelliteImageData = data.result.response.airport.pluginData.satelliteImage;
        setAirportInfo(airportData);
        setSchedule(scheduleData);
        setRunways(runwaysData);
        setSatelliteImage(satelliteImageData);
      });
  }, [code]);

  const closeHandler = () => {
    setOpenPanel(false);
  };

  return (
    <div id="airport" style={{ transform: openPanel ? 'translateX(0)' : 'translateX(-100vw)' }}>
      {airportInfo ? <Header airportInfo={airportInfo} closeHandler={closeHandler} /> : null}
      {activeTab === 1 && airportInfo && schedule && satelliteImage ? (
        <>
          <AirportPhoto airportInfo={airportInfo} />
          <div className="airport-scroll-wrapper">
            <Weather airportInfo={airportInfo} />
            <Rating iata={airportInfo.code.iata} name={airportInfo.name} />
            <ScheduledFlights schedule={schedule} />
            <Runway satelliteImage={satelliteImage} runways={runways} />
          </div>
        </>
      ) : null}
      {activeTab === 2 && airportInfo ? <ArrivalsAndDepartures code={airportInfo.code.iata} mode="arrivals" /> : null}
      {activeTab === 3 && airportInfo ? <ArrivalsAndDepartures code={airportInfo.code.iata} mode="departures" /> : null}
      {buttons.map((button) => (
        <Button
          key={button.num}
          num={button.num}
          name={button.name}
          active={activeTab}
          changeTabHandler={changeTabHandler}
        />
      ))}
    </div>
  );
};

export default Airport;
