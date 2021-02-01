import { Dispatch } from 'redux';

const saveAirports = (airports: any) => ({
  type: 'ALL_AIRPORTS',
  allAirports: airports,
});

const airports = () => (dispatch: Dispatch) => {
  const fetchStr = '/api/allAirports';

  fetch(fetchStr, { method: 'GET' })
    .then((resp) => resp.json())
    .then((json) => {
      if (!json) {
        return;
      }

      dispatch(saveAirports(json.rows));
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
