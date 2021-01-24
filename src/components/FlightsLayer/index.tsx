import React, { Component, ComponentPropsWithoutRef } from 'react';
import { Polyline } from 'react-leaflet';
import { Map } from 'leaflet';
import { FlightsLayerState } from '../../types/FlightsLayerType';
import FlightLayerUpdater from './FlightsLayerUpdater';
import { AircraftState } from '../../types';
import AircraftMarker from './AircraftMarker';
import { roundCoordinates, calculateTrack } from '../../utils/apiUtils';
import './index.scss';

class FlightsLayer extends Component<ComponentPropsWithoutRef<'object'>, FlightsLayerState> {
  timerId: NodeJS.Timeout;

  angleStep: number;

  constructor(props: ComponentPropsWithoutRef<'object'>) {
    super(props);
    this.state = {
      supressRequest: false,
      aircrafts: {},
      mapBounds: null,
      trackLatLngs: [],
      trackShowingAircraft: null,
    };
    this.angleStep = 15;
  }

  componentDidMount(): void {
    this.timerId = setInterval(
      () => this.getAircrafts(),
      3000,
    );
  }

  componentWillUnmount(): void {
    clearInterval(this.timerId);
  }

  getAircrafts(): void {
    const { mapBounds } = this.state;
    if (!mapBounds) {
      return;
    }

    const nw = mapBounds.getNorthWest();
    const se = mapBounds.getSouthEast();

    const fetchStr = `/api/flights?bounds=${nw.lat},${se.lat},${nw.lng},${se.lng}`;
    fetch(fetchStr, { method: 'GET', mode: 'no-cors' })
      .then((resp) => resp.json())
      .then((json) => {
        if (!json) {
          return;
        }

        this.setState((state) => {
          const { aircrafts: aircraftMap, trackShowingAircraft } = state;
          let { trackLatLngs: latLngs } = state;

          Object.keys(json).filter((key) => !['full_count', 'version'].includes(key))?.forEach((flightId: string) => {
            const stateArr = json[flightId];

            const currentAircraftState = aircraftMap[flightId];
            if (!currentAircraftState) {
              const positions = [];
              positions.unshift({
                latitude: stateArr[1],
                longitude: stateArr[2],
                true_track: stateArr[3],
                altitude: stateArr[4],
                velocity: stateArr[5],
                time_position: stateArr[10],
              });
              aircraftMap[flightId] = {
                icao24: stateArr[0],
                latitude: stateArr[1],
                longitude: stateArr[2],
                true_track: stateArr[3],
                altitude: stateArr[4],
                velocity: stateArr[5],
                aircraft_type: stateArr[8],
                registration: stateArr[9],
                time_position: stateArr[10],
                airport_from: stateArr[11],
                airport_to: stateArr[12],
                callsign: stateArr[13],
                positions,
              };
            } else {
              Object.assign(currentAircraftState, {
                icao24: stateArr[0],
                latitude: stateArr[1],
                longitude: stateArr[2],
                true_track: stateArr[3],
                altitude: stateArr[4],
                velocity: stateArr[5],
                aircraft_type: stateArr[8],
                registration: stateArr[9],
                time_position: stateArr[10],
                airport_from: stateArr[11],
                airport_to: stateArr[12],
                callsign: stateArr[13],
              });
              const { positions } = currentAircraftState;
              positions.unshift({
                latitude: stateArr[1],
                longitude: stateArr[2],
                true_track: stateArr[3],
                altitude: stateArr[4],
                velocity: stateArr[5],
                time_position: stateArr[10],
              });
              positions.sort((pos1, pos2) => pos2.time_position - pos1.time_position);

              if (flightId === trackShowingAircraft) {
                latLngs = calculateTrack(aircraftMap[flightId], false, []);
              }
            }
          });

          return { aircrafts: aircraftMap, trackLatLngs: latLngs };
        });
      });
  }

  getMarkers(): JSX.Element[] {
    const { aircrafts, trackShowingAircraft } = this.state;

    return Object.entries(aircrafts).map(([flightId, aircraft]) => {
      const longitude = roundCoordinates(aircraft.positions[0].longitude || aircraft.longitude);
      const latitude = roundCoordinates(aircraft.positions[0].latitude || aircraft.latitude);
      return (<AircraftMarker
        key={flightId}
        position={[latitude, longitude]}
        altitude={aircraft.positions[0].altitude}
        trackAngle={aircraft.positions[0].true_track}
        callsign={aircraft.callsign}
        aircraftType={aircraft.aircraft_type}
        withTrack={trackShowingAircraft === flightId}
        onIconClick={() => this.aircraftIconClickHandler(flightId)}
      />);
    });
  }

  aircraftIconClickHandler = (flightId: string): void => {
    this.showTrack(flightId);
  };

  showTrack(flightId: string): void {
    const { trackShowingAircraft } = this.state;
    if (flightId !== trackShowingAircraft) {
      const fetchStr = `/api/flightStatus?flightId=${flightId}`;
      fetch(fetchStr, { method: 'GET', mode: 'no-cors' })
        .then((resp) => resp.json())
        .then((json) => {
          const historicTrail = json.trail.map((itm: {
            lat: number,
            lng: number,
            alt: number,
            spd: number,
            ts: number,
            hd: number
          }) => ({
            longitude: itm.lng,
            latitude: itm.lat,
            true_track: itm.hd,
            altitude: itm.alt,
            velocity: itm.spd,
            time_position: itm.ts,
          }));

          this.revealTrack(flightId, true, historicTrail);
        });
    }
    this.revealTrack(flightId, false, []);
  }

  toggleSupressRequest = (): void => this.setState((state) => ({
    supressRequest: !state.supressRequest,
  }));

  updateMapBounds = (map: Map): void => {
    const { supressRequest } = this.state;
    if (supressRequest) {
      return;
    }

    setTimeout(() => this.toggleSupressRequest(), 5000);

    this.setState((state) => {
      if (state.mapBounds === null
        || (map.getBounds().getNorthEast().lat !== state.mapBounds.getNorthEast().lat
          || map.getBounds().getNorthEast().lng !== state.mapBounds.getNorthEast().lng)) {
        return {
          supressRequest: true,
          mapBounds: map.getBounds(),
        };
      }
      return {
        supressRequest: true,
        mapBounds: state.mapBounds,
      };
    });
  };

  revealTrack = (flightId: string, needUpdateTrack: boolean, historicTrail: {
    latitude: number,
    longitude: number,
    true_track: number,
    altitude: number,
    velocity: number,
    time_position: number,
  }[]): void => {
    this.setState((state) => {
      const { aircrafts } = state;

      const aircraft: AircraftState = aircrafts[flightId];

      const latLngs = calculateTrack(aircraft, needUpdateTrack, historicTrail);

      return { trackLatLngs: latLngs, trackShowingAircraft: flightId };
    });
  };

  render(): JSX.Element {
    const markers = this.getMarkers();
    const { trackLatLngs } = this.state;
    return (
      <>
        <FlightLayerUpdater updateMapBounds={this.updateMapBounds} />
        {markers}
        <Polyline positions={trackLatLngs} pathOptions={{ color: 'lime' }} />
      </>
    );
  }
}

export default FlightsLayer;
