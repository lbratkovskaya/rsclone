import React, { Component, ComponentPropsWithoutRef } from 'react';
import {
  LatLngExpression,
  latLng,
} from 'leaflet';
import {
  MapContainer,
  TileLayer,
} from 'react-leaflet';
import {
  mapZoom,
  getMapURL,
} from '../../utils/apiUtils';
import FlightsLayer from '../../components/FlightsLayer';

interface FlightMapState {
  geoPosition: LatLngExpression,
}

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
          console.log(geoPosition);
          map.locate({ setView: true, maxZoom: 8 });
        }}
      >
        <TileLayer
          url={getMapURL()}
        />
        <FlightsLayer />
      </MapContainer>
    );
  }
}

export default FlightsMap;
