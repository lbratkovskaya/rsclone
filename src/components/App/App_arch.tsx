import React, { useState } from 'react';
import axios from 'axios';
import {
  Link,
  Router,
  Route,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { PermIdentity } from '@material-ui/icons';
import StartForm from '../StartForm/StartForm';
import FlightsMap from '../FlightsMap';
import { IUser } from '../../types';
import './index.scss';
import Airport from '../Airport';
import { LeafletMouseEvent, Marker } from 'leaflet';
import { ExtendedMarkerOptions } from 'leaflet-contextmenu';

const App: React.FC = (): JSX.Element => {
  const [openAirportPanel, setOpenAirportPanel] = useState(false);
  const [currentAirportCode, setCurrentAirportCode] = useState('');
  const [userData, setUserData] = useState(null);
  const history = createBrowserHistory();
  const code = 'MSQ';

  const getCurrentUser = (): null | IUser => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'auth/current_user',
    }).then((res) => {
      console.log(res.data);
      setUserData(res.data);
      return res.data;
    });
    return null;
  };

  const toggleAirportPanelOpen = (event: LeafletMouseEvent) => {
    if (!openAirportPanel) {
      const airportMarker = event.target as Marker<ExtendedMarkerOptions>;
      const options = airportMarker.options as ExtendedMarkerOptions;
      setCurrentAirportCode(options.airportCode);
    }
    setOpenAirportPanel(!openAirportPanel);
  }

  return (
    <Router history={history}>
      {/* <Link to="/">Main page</Link> */}
      <div className="login-form">
        <Link to="/login" >
          <PermIdentity />
          Login
        </Link>
      </div>
      <Route exact path="/" render={() =>
        <FlightsMap
          userData={userData}
          onAirportIconClick={toggleAirportPanelOpen}
          onAircraftIconClick={() => { }}
          showArrivals={() => { }}
          showDepartures={() => { }}
        />
      }
      />
      <Route exact path="/login" render={() =>
        <StartForm
          getCurrentUser={getCurrentUser}
          onLoginRedirectHandler={() => {
            history.push('/');
            getCurrentUser();
          }
          }
        />
      }
      />
      <Airport code={currentAirportCode} openAirportPanel={openAirportPanel} setOpenPanel={setOpenAirportPanel} />
    </Router>
  );
};

export default App;
