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
import { FlightDataType, FlightPanelProps } from '../../types/flightDataTypes';
import './Flight.scss';
import API from '../../utils/API';

const FlightPanel = ({ hexCode, isFollowed, isPanelOpen, setOpenPanel: setAircraftPanelOpen, addToFavoritiesHandler }: FlightPanelProps): JSX.Element => {
  const [flightInfo, setFlightInfo] = useState<any>(null);
  const [openPanel, setOpenPanel] = useState(isPanelOpen);

  const closeHandler = () => {
    setOpenPanel(false);
    setAircraftPanelOpen(false);
  };

  const favoritiesHandler = () => {
    if (flightInfo) {
      addToFavoritiesHandler(flightInfo as FlightDataType, !isFollowed);
    }
  }

  useEffect(() => {
    API.get(`/api/fly?flightCode=${hexCode}`, { method: 'GET' })
      .then((response) => response.data)
      .then((data) => setFlightInfo(data));
  }, [hexCode]);

  return (
    <div className={`flight ${(isPanelOpen || openPanel) ? 'opened' : 'closed'}`}>
      {flightInfo && (
        <>
          <HeaderFlight
            number={flightInfo.identification?.number?.default || ''}
            callsign={flightInfo.identification?.callsign || ''}
            airline={flightInfo.airline?.name || ''}
            closeHandler={closeHandler}
          />
          <AircraftPhoto
            photo={flightInfo.aircraft?.images?.large && flightInfo.aircraft?.images?.large[0]?.src
              ? flightInfo.aircraft?.images?.large[0]?.src : null}
            photoLink={flightInfo.aircraft?.images?.large
              && flightInfo.aircraft?.images?.large[0]?.src
              ? flightInfo.aircraft?.images?.large[0]?.link : null}
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
              currentPoint={flightInfo.trail && flightInfo.trail[0] ? flightInfo.trail[0] : null}
              endPoint={flightInfo.airport?.destination?.position || null}
              currentTime={flightInfo.trail && flightInfo.trail[0] ? flightInfo.trail[0].ts : null}
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
              alt={flightInfo.trail && flightInfo.trail[0] ? flightInfo.trail[0]?.alt : null}
              hd={flightInfo.trail && flightInfo.trail[0] ? flightInfo.trail[0]?.hd : null}
            />
            <Speed spd={flightInfo.trail && flightInfo.trail[0] ? flightInfo.trail[0]?.spd : null} />
            <FlightData
              hex={flightInfo.aircraft?.hex || ''}
              lat={flightInfo.trail && flightInfo.trail[0] ? flightInfo.trail[0]?.lat : null}
              lng={flightInfo.trail && flightInfo.trail[0] ? flightInfo.trail[0]?.lng : null}
              airline={flightInfo.airline?.code || {}}
            />
          </div>
          <FlightButton toggleSelectedFlights={favoritiesHandler} isFollowed={isFollowed} />
        </>
      )}
    </div>
  );
};

export default FlightPanel;
