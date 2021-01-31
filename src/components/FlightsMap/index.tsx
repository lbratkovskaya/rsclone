import React, {
  Component,
  RefObject,
} from 'react';
import { Map, TileLayer as LeafletTileLayer } from 'leaflet';
import {
  MapContainer,
  TileLayer,
} from 'react-leaflet';
import FlightsLayer from '../FlightsLayer';
import FuncAirportsLayer from '../FuncAirportsLayer';
import {
  FlightMapProps,
  FlightMapState,
  FlightsMapStyle
} from '../../types/FlightsMapType';
import MapStyleSelector from './MapStyleSelector';
import {
  getMapURL,
  readUserMapSettings,
  saveUserMapSettings
} from '../../utils/apiUtils';
import {
  EURASIAN_CENTER,
  MAP_ZOOM_DEFAULT,
  MAP_STYLE_DARK,
} from '../../utils/constants';
import { UserMapSettings } from '../../types';
import './index.scss';

class FlightsMap extends Component<FlightMapProps, FlightMapState> {
  tileLayerRef: RefObject<LeafletTileLayer>;

  constructor(props: FlightMapProps) {
    super(props);
    const userSettings: UserMapSettings = readUserMapSettings(props.userData?.username);
    this.state = {
      geoPosition: EURASIAN_CENTER,
      mapStyle: userSettings ? userSettings.mapStyle : MAP_STYLE_DARK,
      mapZoom: userSettings ? userSettings.mapZoom : MAP_ZOOM_DEFAULT,
    };
    this.tileLayerRef = React.createRef<LeafletTileLayer>();
  }

  componentDidMount(): void {
    window.addEventListener('beforeunload', this.componentGracefulUnmount);
  }

  componentGracefulUnmount = (): void => {
    const { mapZoom, mapStyle } = this.state;
    const { userData } = this.props;
    saveUserMapSettings(userData?.username, {mapZoom, mapStyle});
  }

  onMapStyleSelect = (key: FlightsMapStyle) => {
    this.tileLayerRef.current?.setUrl(getMapURL(key));
    this.setState({ mapStyle: key });
  }

  setCurrentUserLocation = (map: Map) => {
    const { mapZoom } =  this.state;
    const { userData } = this.props;
    const userSettings: UserMapSettings = readUserMapSettings(userData?.username);

    const userZoom: number = userSettings ? userSettings.mapZoom : mapZoom;
    map.locate({ setView: true, maxZoom: userZoom });
  }

  onMapBoundsUpdate = (map: Map) => {
    const currentZoom = map.getZoom();
    this.setState({ mapZoom: currentZoom });
  }

  render(): JSX.Element {
    const { geoPosition, mapZoom, mapStyle } = this.state;
    const { onAirportIconClick } = this.props;
    return (
      <MapContainer
        center={geoPosition}
        zoom={mapZoom}
        scrollWheelZoom
        whenCreated={this.setCurrentUserLocation}
      >
        <TileLayer
          ref={this.tileLayerRef}
          url={getMapURL(mapStyle)}
        />
        <FlightsLayer onMapBoundsUpdate={this.onMapBoundsUpdate}/>
        <FuncAirportsLayer onAirportIconClick={onAirportIconClick}/>
        <MapStyleSelector currentSelection={mapStyle} onStyleSelect={this.onMapStyleSelect} />
      </MapContainer>
    );
  }
}

export default FlightsMap;
