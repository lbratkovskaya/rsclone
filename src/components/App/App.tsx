import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import StartForm from '../StartForm/StartForm';
import FlightsMap from '../FlightsMap';
import Airport from '../Airport/Airport';
import './index.scss';

const App: React.FC = (): JSX.Element => {
  const [openAirportPanel, setOpenAirportPanel] = useState(false);
  const code = 'MSQ';

  const toggleAirportPanelOpen = () => {
    setOpenAirportPanel(!openAirportPanel);
  }
  
  return (
    <Router>
      <Link to="/">Main page</Link>
      <div className="login-form">
        <Link to="/login">Login form</Link>
      </div>
      <Route exact path="/" render={() => 
        <FlightsMap
          onAirportIconClick={toggleAirportPanelOpen}
          onAircraftIconClick={() => {}}
        />
        }  
      />
      <Route exact path="/login" component={StartForm} />
      {/* <StartForm />
      <FlightsMap /> */}
      <Airport code={code} openAirportPanel={openAirportPanel} />
    </Router>
  );
};

export default App;
