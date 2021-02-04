import { IUser } from './';

export interface AppState {
  openAirportPanel: boolean,
  openFlightPanel: boolean,
  currentAircraftCode: string,
  currentAirportCode: string,
  airportPanelTab: number,
  userData: IUser,
}
