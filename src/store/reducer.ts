import { AirportMap } from '../types/AirportsLayerType';

const reducer = (store: any, action: { type: string; airportsMap: AirportMap; }) => {
  if (action.type === 'ALL_AIRPORTS') {
    return {
      ...store,
      airportsMap: action.airportsMap,
    };
  }
  return store;
};

export default reducer;
