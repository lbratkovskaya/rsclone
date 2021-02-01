import { Dispatch } from 'redux';
import { AirportMap } from '../../types/AirportsLayerType';

const saveAirports = (newAirportMap: AirportMap) => ({
  type: 'ALL_AIRPORTS',
  airportsMap: newAirportMap,
});

const airports = () => (dispatch: Dispatch) => {
  const fetchStr = '/api/allAirports';

  fetch(fetchStr, { method: 'GET' })
    .then((resp) => resp.json())
    .then((json) => {
      if (!json) {
        return;
      }

      const newAirportMap: AirportMap = {
        version: json.version,
        airports: json.rows,
      };

      dispatch(saveAirports(newAirportMap));
      // const { airportsMap } = this.state;

      // const newState = { airportsMap };

      // if (airportsMap) {
      //   if (json.version > airportsMap.version) {
      //     // should update to fresh version
      //     Object.assign(newState, {
      //       airportsMap: {
      //         version: json.version,
      //         airports: [...json.rows],
      //       },
      //     });
      //   }
      // }

      // this.setState(newState);
    });
};

export default airports;
