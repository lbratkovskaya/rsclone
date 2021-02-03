import React, { Component, ComponentProps } from 'react';
import {
  Link,
  Route,
} from 'react-router-dom';
import { LeafletMouseEvent, Marker } from 'leaflet';
import { ExtendedMarkerOptions } from 'leaflet-contextmenu';
import { createBrowserHistory, History } from 'history';
import { PermIdentity } from '@material-ui/icons';
import StartForm from '../StartForm/StartForm';
import FlightsMap from '../FlightsMap';
import Airport from '../Airport';
import Flight from '../Flight/Flight';
import TeamFooter from './TeamFooter';
import RSSchoolLogo from './RSSchoolLogo';
import { FavoritiesItem, IUser } from '../../types';
import { AppState } from '../../types/ApplicationType';
import { FlightDataType } from '../../types/flightDataTypes';
import API from '../../utils/API';
import {
  AIRPORT_TAB_BUTTONS,
  DEFAULT_AIRPORT_CODE,
} from '../../utils/airportConstants';
import './index.scss';

class App extends Component<ComponentProps<'object'>, AppState> {
  history: History;

  hexCode: string;

  constructor(props: ComponentProps<'object'>) {
    super(props);
    this.state = {
      openAirportPanel: false,
      openFlightPanel: false,
      currentAircraftCode: '26b92eb6',
      currentAirportCode: DEFAULT_AIRPORT_CODE,
      airportPanelTab: AIRPORT_TAB_BUTTONS.General.num,
      userData: null,
    };
    this.history = createBrowserHistory();
    this.hexCode = '26b92eb6';
  }

  AddSelectedFlightToFavorites = (flightInfo: FlightDataType, doAdd: boolean): void => {
    const { userData, currentAircraftCode } = this.state;
    if (!userData) {
      return;
    }
    const selectedFlights = userData.favorites && [...userData.favorites] || [];

    if (doAdd) {
      for (let i = 0; i < selectedFlights.length; i += 1) {
        if (selectedFlights[i].flightId === currentAircraftCode) {
          return;
        }
      }
      selectedFlights.push({
        addedToFavorites: new Date(),
        flightId: currentAircraftCode,
        codeName: flightInfo.aircraft?.registration,
        arrivalAirport: {
          name: flightInfo.airport?.destination?.name,
          code: flightInfo.airport?.destination?.code?.iata,
          position: {
            latitude: flightInfo.airport?.destination?.position?.latitude,
            longitude: flightInfo.airport?.destination?.position?.longitude,
          },
        },
        departureAirport: {
          name: flightInfo.airport?.origin?.name,
          code: flightInfo.airport?.origin?.code?.iata,
          position: {
            latitude: flightInfo.airport?.origin?.position?.latitude,
            longitude: flightInfo.airport?.origin?.position?.longitude,
          },
        },
      });
    } else {
      const targetFligth = selectedFlights.find((el) => el.flightId === currentAircraftCode);
      const index = selectedFlights.indexOf(targetFligth);
      selectedFlights.splice(index, 1);
    }
    this.setUserFavorities(userData.id, userData.username, selectedFlights);
  };

  getCurrentUser = (): null | IUser => {
    API.get('auth/current_user', {
      method: 'get',
      withCredentials: true,
    }).then((res) => {
      this.setState({ userData: res.data });
      return res.data;
    });
    return null;
  };

  setUserFavorities = (userId: string, username: string, favorites: FavoritiesItem[]) => {
    API.put('auth/save_favorites',
      {
        id: userId,
        username,
        favorites,
      }, {
      withCredentials: true,
    }).then(() => {
      this.getCurrentUser();
    });
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

  setOpenAircraftPanel = (setOpen: boolean): void => {
    this.setState({
      openFlightPanel: setOpen,
    });
  };

  toggleAirportPanelOpen = (event: LeafletMouseEvent): void => {
    const { openAirportPanel } = this.state;
    const airportMarker = event.target as Marker<ExtendedMarkerOptions>;
    const options = airportMarker.options as ExtendedMarkerOptions;
    const newAirportCode = options.airportCode;
    this.setState({
      openAirportPanel: !openAirportPanel,
      openFlightPanel: false,
      currentAirportCode: newAirportCode,
    });
  };

  toggleAircraftPanelOpen = (flightId: string, isShowing: boolean): void => {
    this.setState({
      openFlightPanel: !isShowing,
      openAirportPanel: false,
      currentAircraftCode: flightId,
    });
  };


  render(): JSX.Element {
    const {
      openAirportPanel,
      openFlightPanel,
      currentAirportCode,
      currentAircraftCode,
      airportPanelTab,
      userData,
    } = this.state;
    const isFollowed = userData && userData.favorites?.some((fav) => fav.flightId === currentAircraftCode);
    return (
      <>
        <Route
          exact
          path="/"
          render={() => (
            <>
              {!userData &&
                (
                  <div className="login-form">
                    <Link to="./login">
                      <PermIdentity />
                      Login
                    </Link>
                  </div>
                )
              }
              <FlightsMap
                userData={userData}
                onAirportIconClick={this.toggleAirportPanelOpen}
                onAircraftIconClick={this.toggleAircraftPanelOpen}
                showArrivals={this.showArrivals}
                showDepartures={this.showDepartures}
              />
              <Flight
                hexCode={currentAircraftCode}
                isFollowed={isFollowed}
                isPanelOpen={openFlightPanel}
                addToFavoritiesHandler={this.AddSelectedFlightToFavorites}
                setOpenPanel={this.setOpenAircraftPanel}
              />
              <Airport
                code={currentAirportCode}
                isPanelOpen={openAirportPanel}
                activeTab={airportPanelTab}
                setOpenPanel={this.setOpenAirportPanel}
              />
            </>
          )}
        />
        <Route
          path="/login"
          render={(props) => {
            const { history } = props;
            return (
              <StartForm
                history={history}
                getCurrentUser={this.getCurrentUser}
              />
            );
          }}
        />
        <footer className="footer">
          <TeamFooter />
          <RSSchoolLogo />
        </footer>
      </>
    );
  }
}

export default App;
