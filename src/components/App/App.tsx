import React, { useState } from 'react';
import Flight from '../Flight/Flight';
import StartForm from '../StartForm/StartForm';
import FlightsMap from '../FlightsMap';
import Airport from '../Airport/Airport';
import './index.scss';

const App:React.FC = (): JSX.Element => {
  const [openFlightPanel] = useState(true);
  const hexCode = '26b3c1e2';

  return (
    <>
      <Flight hexCode={hexCode} openFlightPanel={openFlightPanel} />
      <StartForm />
      <FlightsMap />
      <Airport code={code} openAirportPanel={openAirportPanel} />

    </>
  );
};

export default App;
