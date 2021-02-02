import React, { useEffect, useState } from 'react';
import HeaderFlight from './HeaderFlight/HeaderFlight';
import AircraftPhoto from './AircraftPhoto/AircraftPhoto';
import FlightInfo from './FlightInfo/FlightInfo';
import FlightProgress from './FlightProgress/FlightProgress';
import AircraftInfo from './AircraftInfo/AircraftInfo';
import RecentFlights from './RecentFlights/RecentFlights';
import Altitude from './Altitude/Altitude';
import Speed from './Speed/Speed';
import FlightData from './FlightData/FlightData';
import FlightButton from './FlightButton/FlightButton';
import { FlightPanelProps, FollowedFlight } from '../../types/flightDataTypes';
import './Flight.scss';

const FlightPanel = ({ hexCode, openFlightPanel }: FlightPanelProps): JSX.Element => {
  const [flightInfo, setFlightInfo] = useState<any>(null);
  const [openPanel, setOpenPanel] = useState(openFlightPanel);
  const selectedFlights:Array<FollowedFlight> = [];
  let isFollowed = false;

  const closeHandler = () => {
    setOpenPanel(false);
  };

  const toggleSelectedFlights = (clicked: boolean): void => {
    if (clicked) {
      for (let i = 0; i < selectedFlights.length; i += 1) {
        if (selectedFlights[i].flightId === hexCode) {
          return;
        }
      }
      isFollowed = true;
      selectedFlights.push({
        addedToFavorites: new Date(),
        flightId: hexCode,
        registration: flightInfo.aircraft?.registration,
        arrivalAirport: {
          name: flightInfo.airport?.destination?.name,
          code: flightInfo.airport?.destination?.code?.iata,
          position: {
            latitude: flightInfo.airport?.destination?.position?.latitude,
            longitude: flightInfo.airport?.destination?.position?.longitude,
          },
        },
        departureAirport: {
          name: flightInfo.airport?.origin?.name,
          code: flightInfo.airport?.origin?.code?.iata,
          position: {
            latitude: flightInfo.airport?.origin?.position?.latitude,
            longitude: flightInfo.airport?.origin?.position?.longitude,
          },
        },
      });
    } else {
      const targetFligth = selectedFlights.find((el) => el.flightId === hexCode);
      const index = selectedFlights.indexOf(targetFligth);
      selectedFlights.splice(index, 1);
      isFollowed = false;
    }
    console.log(selectedFlights);
  };

  for (let i = 0; i < selectedFlights.length; i += 1) {
    if (selectedFlights[i].flightId === hexCode) {
      isFollowed = true;
    }
  }

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
          number={flightInfo.identification?.number?.default || ''}
          callsign={flightInfo.identification?.callsign || ''}
          airline={flightInfo.airline?.name || ''}
          closeHandler={closeHandler}
        />
        <AircraftPhoto
          photo={flightInfo.aircraft?.images?.large[0]?.src || null}
          photoLink={flightInfo.aircraft?.images?.large[0]?.link || null}
        />
        <div className="flight-scroll-wrapper">
          <FlightInfo
            iataOrigin={flightInfo.airport?.origin?.code?.iata || ''}
            cityOrigin={flightInfo.airport?.origin?.position?.region?.city || ''}
            iataDestination={flightInfo.airport?.destination?.code?.iata || ''}
            cityDestination={flightInfo.airport?.destination?.position?.region?.city || ''}
            timezoneOrigin={flightInfo.airport?.origin?.timezone || null}
            timezoneDestination={flightInfo.airport?.destination?.timezone || null}
            time={flightInfo.time || null}
          />
          <FlightProgress
            startPoint={flightInfo.trail[flightInfo.trail.length - 1] || null}
            currentPoint={flightInfo.trail[0] || null}
            endPoint={flightInfo.airport.destination.position || null}
            currentTime={flightInfo.trail[0].ts || null}
            startTime={flightInfo.time.real.departure || null}
            endTime={flightInfo.time.estimated.arrival || null}
            hexCode={hexCode}
          />
          <AircraftInfo
            model={flightInfo.aircraft?.model || {}}
            registration={flightInfo.aircraft?.registration || ''}
            airline={flightInfo.airline?.code || {}}
          />
          <RecentFlights
            registration={flightInfo.aircraft?.registration || ''}
            history={flightInfo.flightHistory?.aircraft || null}
          />
          <Altitude
            alt={flightInfo.trail[0]?.alt || null}
            hd={flightInfo.trail[0]?.hd || null}
          />
          <Speed spd={flightInfo.trail[0]?.spd || null} />
          <FlightData
            hex={flightInfo.aircraft?.hex || ''}
            lat={flightInfo.trail[0]?.lat || null}
            lng={flightInfo.trail[0]?.lng || null}
            airline={flightInfo.airline?.code || {}}
          />
        </div>
        <FlightButton toggleSelectedFlights={toggleSelectedFlights} isFollowed={isFollowed} />
      </>
      )}
    </div>
  );
};

export default FlightPanel;
