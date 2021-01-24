import { LatLngExpression } from 'leaflet';
import aircraftIcons from '../airplane_icons.json';
import { AircraftIcon, AircraftIconGroup, AircraftState } from '../types';

interface AccessObject {
  baseUrl: string,
  nickname: string,
  styleId: string,
  token: string
}

export const mapAccessObj: AccessObject = {
  baseUrl: 'https://api.mapbox.com',
  nickname: 'lbratkovskaya',
  styleId: 'ckjjqmnue0vlk1ao2gj8cdamy',
  token: 'pk.eyJ1IjoibGJyYXRrb3Zza2F5YSIsImEiOiJja2pqcTY0N2owNnd0MnJzMnNrbzVveGVuIn0.ibWjrmV2-J50CKfeNbZvsw',
};

export const getMapURL = (): string => {
  const {
    baseUrl,
    nickname,
    styleId,
    token,
  } = mapAccessObj;

  return `${baseUrl}/styles/v1/${nickname}/${styleId}/tiles/256/{z}/{x}/{y}@2x?access_token=${token}`;
};

export const mapCenterCoordinates: LatLngExpression = [56.852, 60.612];

export const mapZoom = 8;

export const anglesRound = 360;

const roundingCoeff = 1000;

export const roundCoordinates = (
  coordinate: number,
): number => Math.round(coordinate * roundingCoeff) / roundingCoeff;

const DEFAULT_ICAO = 'B738';

export const getIconByAircraft = (aircraftType: string): AircraftIcon => {
  const iconGroups: AircraftIconGroup = aircraftIcons.icons;
  const iconIcaos = Object.keys(iconGroups);
  // Match by ICAO
  if (iconIcaos.indexOf(aircraftType) !== -1) {
    return iconGroups[aircraftType];
  }
  // Match by alias
  for (let i = 0; i < iconIcaos.length; i += 1) {
    const iconIcao: string = iconIcaos[i];
    const currentIcon = iconGroups[iconIcao];
    if (currentIcon.aliases.indexOf(aircraftType) !== -1) {
      return currentIcon;
    }
  }
  // Fallback to default
  return iconGroups[DEFAULT_ICAO];
};

export const nonTrackingIconPath = '../../img/t-sprite_c-yellow_w-30_s-yes.png';

export const trackingIconPath = '../../img/t-sprite_c-red_w-30_s-yes.png';

export const unknownCallsign = 'unknown';

export const calculateTrack = (aircraft: AircraftState, needUpdateTrack: boolean, historicTrail: {
  latitude: number,
  longitude: number,
  true_track: number,
  altitude: number,
  velocity: number,
  time_position: number,
}[]): LatLngExpression[] => {
  if (needUpdateTrack) {
    const sortedPositions = [...aircraft.positions, ...historicTrail]
      .sort((pos1, pos2) => pos2.time_position - pos1.time_position);

    aircraft.positions = [...sortedPositions];
  }

  return aircraft.positions
    .map((pos) => [pos.latitude, pos.longitude]);
};
