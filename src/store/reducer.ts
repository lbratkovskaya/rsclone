interface IStore {
  airports: any[];
}

const initialStore: IStore = {
  airports: [],
};

const reducer = (store = initialStore, action: { type: string; allAirports: any; }) => {
  if (action.type === 'ALL_AIRPORTS') {
    return {
      ...store,
      airports: action.allAirports,
    };
  }
  return store;
};

export default reducer;
