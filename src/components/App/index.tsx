import React, { Component, ComponentProps } from 'react';
import axios from 'axios';
import {
  Link,
  Router,
  Route,
} from 'react-router-dom';
import { LeafletMouseEvent, Marker } from 'leaflet';
import { ExtendedMarkerOptions } from 'leaflet-contextmenu';
import { createBrowserHistory, History } from 'history';
import { PermIdentity } from '@material-ui/icons';
import StartForm from '../StartForm/StartForm';
import FlightsMap from '../FlightsMap';
import Airport from '../Airport';
import { IUser } from '../../types';
import { AppState } from '../../types/ApplicationType';
import {
  AIRPORT_TAB_BUTTONS,
  DEFAULT_AIRPORT_CODE,
} from '../../utils/airportConstants';
import './index.scss';

class App extends Component<ComponentProps<'object'>, AppState> {
  history: History;

  constructor(props: ComponentProps<'object'>) {
    super(props);
    this.state = {
      openAirportPanel: false,
      currentAirportCode: DEFAULT_AIRPORT_CODE,
      airportPanelTab: AIRPORT_TAB_BUTTONS.General.num,
      userData: null,
    };
    this.history = createBrowserHistory();
  }

  getCurrentUser = (): null | IUser => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'auth/current_user',
    }).then((res) => {
      console.log(res.data);
      this.setState({ userData: res.data });
      return res.data;
    });
    return null;
  };

  showArrivals = (airportCode: string): void => {
    this.showAirportPanelTab(airportCode, AIRPORT_TAB_BUTTONS.Arrivals.num);
  };

  showDepartures = (airportCode: string): void => {
    this.showAirportPanelTab(airportCode, AIRPORT_TAB_BUTTONS.Departures.num);
  };

  showAirportPanelTab = (airportCode: string, tabNumber: number): void => {
    this.setState({
      openAirportPanel: true,
      airportPanelTab: tabNumber,
      currentAirportCode: airportCode,
    });
  };

  setOpenAirportPanel = (setOpen: boolean): void => {
    this.setState({
      openAirportPanel: setOpen,
    });
  };

  toggleAirportPanelOpen = (event: LeafletMouseEvent): void => {
    const { openAirportPanel, currentAirportCode: airportCode } = this.state;
    let newAirportCode = airportCode;
    if (!openAirportPanel) {
      const airportMarker = event.target as Marker<ExtendedMarkerOptions>;
      const options = airportMarker.options as ExtendedMarkerOptions;
      newAirportCode = options.airportCode;
    }
    this.setState({
      openAirportPanel: !openAirportPanel,
      currentAirportCode: newAirportCode,
    });
  };

  render(): JSX.Element {
    const {
      openAirportPanel,
      currentAirportCode,
      airportPanelTab,
      userData,
    } = this.state;
    return (
      <Router history={this.history}>
        <div className="login-form">
          <Link to="/login">
            <PermIdentity />
            Login
          </Link>
        </div>
        <Route
          exact
          path="/"
          render={() => (
            <FlightsMap
              userData={userData}
              onAirportIconClick={this.toggleAirportPanelOpen}
              onAircraftIconClick={() => { }}
              showArrivals={this.showArrivals}
              showDepartures={this.showDepartures}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <StartForm
              getCurrentUser={this.getCurrentUser}
              onLoginRedirectHandler={() => {
                this.history.push('/');
                this.getCurrentUser();
              }}
            />
          )}
        />
        <Airport
          code={currentAirportCode}
          openAirportPanel={openAirportPanel}
          activeTab={airportPanelTab}
          setOpenPanel={this.setOpenAirportPanel}
        />
      </Router>
    );
  }
}

export default App;
