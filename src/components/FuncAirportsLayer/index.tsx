import { useState } from 'react';
import L, {
  LatLng,
  latLng,
  Marker,
  PointExpression,
  LeafletMouseEvent,
} from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet-contextmenu';
import { ContextMenuMap, ExtendedMarkerOptions } from 'leaflet-contextmenu';
import { AirportType } from '../../types/AirportsLayerType';
import { FuncAirportsLayerProps } from '../../types/FlightsMapType';
import { roundCoordinates } from '../../utils/apiUtils';
import { AIRPORT_BLUE_PIN_HTML, ICON_ANCHOR_SIZE, ICON_SIZE } from '../../utils/constants';
import API from '../../utils/API';

function showCoordinates(coord: LatLng, marker: Marker) {
  marker.bindPopup(`<p>Latitude: ${coord.lat}</p><p>Longitude: ${coord.lng}</p>`).openPopup();
}

function fetchAirports(
  version: number,
  setAirports: (arr: AirportType[]) => void,
  setVersion: (version: number) => void,
): void {
  const fetchStr = './api/allAirports';

  API.get(fetchStr, { method: 'GET' })
    .then((resp) => resp.data)
    .then((json) => {
      if (!json) {
        return;
      }
      if (json.version > version) {
        setAirports([...json.rows]);
        setVersion(json.version);
      }
    });
}

export default function FuncAirportsLayer(props: FuncAirportsLayerProps): JSX.Element {
  const [version, setVersion] = useState(0);
  const [airports, setAirports] = useState([]);
  const map: ContextMenuMap = useMap() as ContextMenuMap;

  Object.assign(map.options, { contextmenu: true });
  map.on('click', () => {
    if (map.contextmenu.isVisible()) {
      map.contextmenu.hide();
    }
  });

  fetchAirports(version, setAirports, setVersion);

  airports.forEach((airport: AirportType) => {
    const longitude: number = roundCoordinates(airport.lon);
    const latitude: number = roundCoordinates(airport.lat);
    const icon = L.divIcon({
      html: AIRPORT_BLUE_PIN_HTML,
      iconSize: ICON_SIZE as PointExpression,
      iconAnchor: ICON_ANCHOR_SIZE as PointExpression,
    });

    const marker: Marker = L.marker([latitude, longitude], {
      airportCode: airport.iata,
      icon,
      contextmenu: true,
      contextmenuInheritItems: false,
      contextmenuItems: [
        {
          text: 'Show coordinates',
          callback: () => showCoordinates(latLng(latitude, longitude), marker),
        },
        '-',
        {
          text: 'Departures',
          callback: () => props.showDepartures(airport.iata),
        }, {
          text: 'Arrivals',
          callback: () => props.showArrivals(airport.iata),
        },
      ],
    } as ExtendedMarkerOptions).addTo(map).on('click', (event) => props.onAirportIconClick(event as LeafletMouseEvent));
  });

  return null;
}
