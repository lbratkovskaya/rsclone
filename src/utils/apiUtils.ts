import { LatLngExpression } from 'leaflet';
import aircraftIcons from '../airplane_icons.json';
import {
  AircraftIcon,
  AircraftIconGroup,
  AircraftPosition,
} from '../types';

export const getMapURL = (): string => {
  interface AccessObject {
    baseUrl: string,
    nickname: string,
    styleId: string,
    token: string
  }

  const mapAccessObj: AccessObject = {
    baseUrl: 'https://api.mapbox.com',
    nickname: 'lbratkovskaya',
    styleId: 'ckjjqmnue0vlk1ao2gj8cdamy',
    token: 'pk.eyJ1IjoibGJyYXRrb3Zza2F5YSIsImEiOiJja2pqcTY0N2owNnd0MnJzMnNrbzVveGVuIn0.ibWjrmV2-J50CKfeNbZvsw',
  };
  const {
    baseUrl,
    nickname,
    styleId,
    token,
  } = mapAccessObj;

  return `${baseUrl}/styles/v1/${nickname}/${styleId}/tiles/256/{z}/{x}/{y}@2x?access_token=${token}`;
};

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

export const joinTracks = (
  livePositions: AircraftPosition[],
  historicTrail: AircraftPosition[],
): AircraftPosition[] => {
  const sortedPositions = [...livePositions, ...historicTrail]
    .sort((pos1, pos2) => pos2.time_position - pos1.time_position);

  return sortedPositions;
};

export const trackCoordinates = (
  trackPositions: AircraftPosition[],
): LatLngExpression[] => trackPositions.map((pos) => [pos.latitude, pos.longitude]);
