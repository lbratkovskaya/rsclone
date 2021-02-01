import { IUser } from './';

export interface AppState {
  openAirportPanel: boolean,
  currentAirportCode: string,
  airportPanelTab: number,
  userData: IUser,
}
