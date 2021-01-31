import { LatLngExpression, latLng } from 'leaflet';
import { FlightsMapStyle } from '../types/FlightsMapType';

export const mapCenterCoordinates: LatLngExpression = [56.852, 60.612];

export const MAP_ZOOM_DEFAULT = 8;

export const anglesRound = 360;

export const nonTrackingIconPath = '../../img/t-sprite_c-yellow_w-30_s-yes.png';

export const trackingIconPath = '../../img/t-sprite_c-red_w-30_s-yes.png';

export const unknownCallsign = 'unknown';

export const EURASIAN_CENTER = latLng(50.41111, 80.2275);

export const ICON_SIZE = [20, 20];

export const ICON_ANCHOR_SIZE = [20, 20];

export const AIRPORT_BLUE_PIN_HTML = '<img src="../../img/airport_pin_40_blue.png" style="height:20px;width:20px;position:absolute;">';

export const CTLR_MAP_PAN_INTERVAL = 800;
export const MAP_STYLE_DARK: FlightsMapStyle = 'dark';
export const MAP_STYLE_LIGHT: FlightsMapStyle = 'light';
export const MAP_STYLE_NATURAL: FlightsMapStyle = 'natural';

const colors = {
  dark: '#545454',
  light: '#e3e3e3',
  natural: '#9cc587',
}
export const MAP_STYLES = [
  {
    title: 'Dark Map Style',
    key: MAP_STYLE_DARK,
    color: colors.dark,
  },
  {
    title: 'Light Map Style',
    key: MAP_STYLE_LIGHT,
    color: colors.light,
  },
  {
    title: 'Natural Map Style',
    key: MAP_STYLE_NATURAL,
    color: colors.natural,
  },
];
