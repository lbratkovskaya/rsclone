import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import AirportPhoto from './AirportPhoto/AirportPhoto';
import Rating from './Rating/Rating';
import Weather from './Weather/Weather';
import Runway from './Runway/Runway';
import Button from './Button/Button';
import ScheduledFlights from './ScheduledFlights/ScheduledFlights';
import ArrivalsAndDepartures from './ArrivalsAndDepartures/ArrivalsAndDepartures';
import {
  AirportInfo,
  Schedule,
  Runways,
  AirportProps,
} from '../../types/airportDataTypes';
import './Airport.scss';

const Airport:React.FC<AirportProps> = ({
  code, openAirportPanel,
}:AirportProps) => {
  const [airportInfo, setAirportInfo] = useState< AirportInfo | null>(null);
  const [schedule, setSchedule] = useState< Schedule | null>(null);
  const [runwaysData, setRunways] = useState< Runways[] | null>(null);
  const [satelliteImageData, setSatelliteImage] = useState('');
  const [activeTab, setActiveTab] = useState(1);
  const [openPanel, setOpenPanel] = useState(openAirportPanel);

  const changeTabHandler = (num: number): void => {
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
        const {
          details, scheduledRoutesStatistics, runways, satelliteImage,
        } = data.result.response.airport.pluginData;
        setAirportInfo(details);
        setSchedule(scheduledRoutesStatistics);
        setRunways(runways);
        setSatelliteImage(satelliteImage);
      });
  }, [code]);

  const closeHandler = () => {
    setOpenPanel(false);
  };

  return (
    <div id="airport" className={openPanel ? 'opened' : 'closed'}>
      {airportInfo ? <Header airportInfo={airportInfo} closeHandler={closeHandler} /> : null}
      {activeTab === 1 && airportInfo && schedule && satelliteImageData ? (
        <>
          <AirportPhoto airportInfo={airportInfo} />
          <div className="airport-scroll-wrapper">
            <Weather airportInfo={airportInfo} />
            <Rating iata={airportInfo.code.iata} name={airportInfo.name} />
            <ScheduledFlights schedule={schedule} />
            <Runway satelliteImage={satelliteImageData} runways={runwaysData} />
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
