import React, {
  Component,
  ComponentPropsWithoutRef,
} from 'react';
import { latLng } from 'leaflet';
import {
  MapContainer,
  TileLayer,
} from 'react-leaflet';
import FlightsLayer from '../../components/FlightsLayer';
import AirportsLayer from '../AirportsLayer';
import { FlightMapState } from '../../types/FlightsMapType';
import { getMapURL } from '../../utils/apiUtils';
import { mapZoom } from '../../utils/constants';
import './index.scss';

class FlightsMap extends Component<ComponentPropsWithoutRef<'object'>, FlightMapState> {
  constructor(props: ComponentPropsWithoutRef<'object'>) {
    super(props);
    this.state = {
      geoPosition: latLng(50.41111, 80.2275),
    };
  }

  render(): JSX.Element {
    const { geoPosition } = this.state;
    return (
      <MapContainer
        center={geoPosition}
        zoom={mapZoom}
        scrollWheelZoom={true}
        whenCreated={(map) => {
          map.locate({ setView: true, maxZoom: 8 });
        }}
      >
        <TileLayer
          url={getMapURL()}
        />
        <FlightsLayer />
        <AirportsLayer />
      </MapContainer>
    );
  }
}

export default FlightsMap;
