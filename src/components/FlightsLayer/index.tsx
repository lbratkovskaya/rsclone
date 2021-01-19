import React, { Component, ComponentPropsWithoutRef } from 'react';
import { Polyline } from 'react-leaflet';
import { LatLngExpression, Map } from 'leaflet';
import { FlightsLayerState } from '../../types/FlightsLayerType';
import FlightLayerUpdater from './FlightsLayerUpdater';
import { AircraftState, AircraftsMap } from '../../types';
import AircraftMarker from './AircraftMarker';
import './index.scss';

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
      trackLatLngs: [],
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

    const headers = new Headers();
    headers.append('Authorization', `Basic ${btoa('labr_:vjhrjdrf_jgtycrfq')}`);
    const ne = mapBounds?.getNorthWest();
    const sw = mapBounds?.getSouthEast();

    const fetchStr = `/api?bounds=${ne.lat},${sw.lat},${ne.lng},${sw.lng}`;
    fetch(fetchStr, { method: 'GET', mode: 'no-cors' })
      .then((resp) => resp.json())
      .then((json) => {
        this.setState((state): {aircrafts: AircraftsMap} => {
          if (!json) {
            return;
          }
          const aircraftMap: AircraftsMap = state.aircrafts || {};

          Object.keys(json).filter((key) => !['full_count', 'version'].includes(key))?.forEach((flightId: string) => {
            const stateArr = json[flightId];

            const currentAircraftState = aircraftMap[flightId];
            if (!currentAircraftState) {
              const positions = [];
              positions.unshift({
                longitude: stateArr[2],
                latitude: stateArr[1],
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
                longitude: stateArr[2],
                latitude: stateArr[1],
                altitude: stateArr[4],
                velocity: stateArr[5],
                time_position: stateArr[10],
              });
              positions.sort((pos1, pos2) => pos2.time_position - pos1.time_position);
            }
          });

          return { aircrafts: aircraftMap };
        });
      });
  }

  getMarkers(): JSX.Element[] {
    const { aircrafts } = this.state;

    return Object.entries(aircrafts).map(([flightId, aircraft]) => {
      const longitude = Math.round((aircraft.positions[0].longitude || aircraft.longitude) * 1000)
        / 1000;
      const latitude = Math.round((aircraft.positions[0].latitude || aircraft.latitude) * 1000)
        / 1000;
      return (<AircraftMarker
        key={flightId}
        position={[latitude, longitude]}
        trackAngle={aircraft.true_track}
        callsign={aircraft.callsign}
        aircraftType={aircraft.aircraft_type}
        onIconClick={() => this.showTrack(flightId)}
      />);
    });
  }

  showTrack(flightId: string): void {
    this.setState((state) => {
      const { aircrafts } = state;

      const aircraft: AircraftState = aircrafts[flightId];

      const sortedPositions = [...aircraft.positions]
        .sort((pos1, pos2) => pos2.time_position - pos1.time_position);

      const latLngs: LatLngExpression[] = sortedPositions
        .map((pos) => [pos.latitude, pos.longitude]);

      return { trackLatLngs: latLngs };
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
