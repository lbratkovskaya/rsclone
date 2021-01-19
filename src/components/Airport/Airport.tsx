import React, { useState, useEffect } from 'react';
import airports from './airports.json';
import Header from './Header/Header';
import Rating from './Rating/Rating';
import Weather from './Weather/Weather';
// import InfoLinks from './InfoLinks/InfoLinks';
import Button from './Button/Button';
// import Arrivals from './Arrivals/Arrivals';
import { TargetAirport, Time } from '../../types';

interface AirportProps {
  code: string,
  openAirportPanel: boolean,
  closeAirportPanel: () => void
}

type ChangeTabHandler = (num: number) => void;

const Airport:React.FC<AirportProps> = ({
  code, openAirportPanel, closeAirportPanel,
}:AirportProps) => {
  const targetAirport:TargetAirport = airports.find((el) => el.icao === code);
  // const [airportInfo, setAirportInfo] = useState< TargetAirport2 | null>(null);
  const [time, setTime] = useState< Time | null>(null);
  const [activeTab, setActiveTab] = useState(1);
  // const [openAirportPanel, setOpenAirportPanel] = useState(true)

  const changeTabHandler:ChangeTabHandler = (num) => {
    setActiveTab(num);
  };

  const Tab3 = () => (
    <h1>Text of tab3</h1>
  );

  const buttons = [
    { num: 1, name: 'General' },
    { num: 2, name: 'Arrivals' },
    { num: 3, name: 'Departures' },
  ];

  useEffect(() => {
    fetch(`http://api.geonames.org/timezoneJSON?lat=${targetAirport.lat}&lng=${targetAirport.lon}&username=chbani`)
      .then((response) => response.json())
    // .then(data => console.log(data))
      .then((data) => setTime(data));
  }, [targetAirport.lat, targetAirport.lon]);

  useEffect(() => {
    fetch('https://cors-anywhere.herokuapp.com/https://www.airport-data.com/api/ap_info.json?iata=JFK')
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  // useEffect(()=> {
  //   fetch(`https://aerodatabox.p.rapidapi.com/airports/icao/${code}`, {
  //     "headers": {
  //       "x-rapidapi-key": "62d5080ea6msh20280fa2924efafp1db373jsnba4406f081aa",
  //       "x-rapidapi-host": "aerodatabox.p.rapidapi.com"
  //     }
  //   })
  //   .then((response) => response.json())
  //   .then(data => setAirportInfo(data))
  //   .catch(err => {
  //     console.error(err);
  //   });
  // },[code])

  // useEffect(()=> {
  //   fetch(`https://aerodatabox.p.rapidapi.com/airports/icao/${code}/time/local`, {
  //     "method": "GET",
  //     "headers": {
  //       "x-rapidapi-key": "62d5080ea6msh20280fa2924efafp1db373jsnba4406f081aa",
  //       "x-rapidapi-host": "aerodatabox.p.rapidapi.com"
  //     }
  //   })
  //   .then((response) => response.json())
  //   .then(data => setTime(data.localTime))
  //   .catch(err => {
  //     console.error(err);
  //   });
  // },[code])

  // useEffect(()=> {
  //   const headers = new Headers();
  //   headers.append('Authorization', `Basic ${btoa('ChrisBani:OPENSKY')}`);
  //   const curDate = new Date;
  //   const seconds = Math.floor(curDate.getTime() / 1000);
  //   fetch(`https://opensky-network.org/api/flights/departure?airport=EDDF&begin=1517227200&end=1517230800`, { headers })
  //   .then(response => response.json())
  // },[])

  return (
    <div id="airport" style={{ transform: openAirportPanel ? 'translateY(0)' : 'translateY(-100vw)' }}>
      {/* {airportInfo && time ? <Header airportInfo={airportInfo} time={time} name ={targetAirport.name}/> :
      null} */}
      <Header targetAirport={targetAirport} />
      {activeTab === 1 ? (
        <>
          <Weather targetAirport={targetAirport} />
          <Rating icao={targetAirport.icao} name={targetAirport.name} />
          {/* <InfoLinks links = {airportInfo.urls}/> */}
        </>
      ) : null}
      {/* {time && activeTab === 2 ? <Arrivals code={code} time={time}/> : null} */}
      {activeTab === 3 ? <Tab3 /> : null}
      {buttons.map((button) => (
        <Button
          key={button.num}
          num={button.num}
          name={button.name}
          changeTabHandler={changeTabHandler}
        />
      ))}
    </div>
  );
};

export default Airport;
