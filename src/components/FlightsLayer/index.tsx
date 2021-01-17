import React, { Component, ComponentPropsWithoutRef } from 'react';
import L, { DivIcon, Map } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { FlightsLayerState } from '../../types/FlightsLayerType';
import FlightLayerUpdater from './FlightsLayerUpdater';
import aircraftIcons from '../../airplane_icons.json';
import { AircraftState, AircraftsMap } from '../../types';
import './index.scss';
import AircraftMarker from './AircraftMarker';

interface IconFrame {
  [key: string]: {
    x: number,
    y: number,
    w: number,
    h: number
  },
}

interface AircraftIcon {
  rotates: boolean,
  aliases: string[],
  frames: IconFrame[]
}

class FlightsLayer extends Component<ComponentPropsWithoutRef<'object'>, FlightsLayerState> {
  timerId: NodeJS.Timeout;

  angleStep: number;

  constructor(props: ComponentPropsWithoutRef<'object'>) {
    super(props);
    this.state = {
      // needRerender: false,
      aircrafts: {},
      aircraftArray: [],
      mapBounds: null,
    };
    this.angleStep = 15;
  }

  componentDidMount(): void {
    this.timerId = setInterval(
      () => this.getAircrafts(),
      5000,
    );
  }

  componentWillUnmount(): void {
    clearInterval(this.timerId);
  }

  getAircrafts(): void {
    const { mapBounds } = this.state;

    const headers = new Headers();
    headers.append('Authorization', `Basic ${btoa('labr_:vjhrjdrf_jgtycrfq')}`);
    const ne = mapBounds?.getNorthEast();
    const sw = mapBounds?.getSouthWest();
    const boundsStr = `lamin=${Math.min(ne.lat, sw.lat)}&lomin=${Math.min(ne.lng, sw.lng)}&lamax=${Math.max(ne.lat, sw.lat)}&lomax=${Math.max(ne.lng, sw.lng)}`;

    fetch(`https://opensky-network.org/api/states/all?${boundsStr}`, { 'method': 'GET', 'headers': headers })
      .then((resp) => resp.json())
      .then((json) => {
        this.setState((state) => {
          if (!json) {
            return;
          }
          const aircraftMap: AircraftsMap = state.aircrafts || {};

          json.states?.forEach((stateArr: [
            string,
            string,
            string,
            number,
            number,
            number,
            number,
            number,
            boolean,
            number,
            number]) => {
            const icao24 = stateArr[0];

            const currentAircraftState = aircraftMap[icao24];
            if (!currentAircraftState) {
              const positions = [];
              positions.unshift({
                time_position: stateArr[3],
                longitude: stateArr[5],
                latitude: stateArr[6],
                baro_altitude: stateArr[7],
                velocity: stateArr[9],
              });
              aircraftMap[icao24] = {
                icao24: stateArr[0],
                callsign: stateArr[1],
                origin_country: stateArr[2],
                time_position: stateArr[3],
                last_contact: stateArr[4],
                longitude: stateArr[5],
                latitude: stateArr[6],
                baro_altitude: stateArr[7],
                on_ground: stateArr[8],
                velocity: stateArr[9],
                true_track: stateArr[10],
                positions: positions,
              };
            } else {
              Object.assign(currentAircraftState, {
                icao24: stateArr[0],
                callsign: stateArr[1],
                origin_country: stateArr[2],
                time_position: stateArr[3],
                last_contact: stateArr[4],
                longitude: stateArr[5],
                latitude: stateArr[6],
                baro_altitude: stateArr[7],
                on_ground: stateArr[8],
                velocity: stateArr[9],
                true_track: stateArr[10],
              });
              const positions = currentAircraftState.positions;
              positions.unshift({
                time_position: stateArr[3],
                longitude: stateArr[5],
                latitude: stateArr[6],
                baro_altitude: stateArr[7],
                velocity: stateArr[9],
              });
            }
          });

          return { aircrafts: aircraftMap };
        });
      })
  }

  getMarkers(): JSX.Element[] {
    const { aircrafts } = this.state;

    return Object.values(aircrafts).map((aircraft: AircraftState) => {
      const longitude = Math.round(aircraft.longitude * 1000) / 1000;
      const latitude = Math.round(aircraft.latitude * 1000) / 1000;
      return (<AircraftMarker
        key={Math.random().toString(36).substr(2, 9)}
        position={[latitude, longitude]}
        trackAngle={aircraft.true_track}
        callsign={aircraft.callsign}
        onIconClick={() => this.showTrack(aircraft.icao24, aircraft.time_position)}
      />);
    });
  }

  showTrack(icao24: string, time_position: number): void {
    const headers = new Headers();
    headers.append('method', 'GET');

    fetch(`https://api.joshdouch.me/hex-reg.php?hex=${icao24}`)
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        console.log(json);
      });
  }

  updateMapBounds = (map: Map): void => {
    this.setState((state) => {
      if (state.mapBounds === null
        || (map.getBounds().getNorthEast().lat !== state.mapBounds.getNorthEast().lat
          || map.getBounds().getNorthEast().lng !== state.mapBounds.getNorthEast().lng)) {
        return { mapBounds: map.getBounds() };
      }
      return { mapBounds: state.mapBounds };
    });
  };

  render(): JSX.Element {
    const markers = this.getMarkers();
    return (
      <>
        <FlightLayerUpdater updateMapBounds={this.updateMapBounds} />
        {markers}
      </>
    );
  }
}

export default FlightsLayer;
