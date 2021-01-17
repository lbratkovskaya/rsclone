import L, { LatLngExpression } from 'leaflet';

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

export const icon = L.divIcon({
  html: '<img src="../../img/t-sprite_c-yellow_w-25_s-yes.png" draggable="false" style="position: absolute; left: -492px; top: -640px; width: 880px; height: 1200px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none; opacity: 1;">',
});

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
