import React, { useState } from 'react';
import StartForm from '../StartForm/StartForm';
import FlightsMap from '../FlightsMap';
import Airport from '../Airport/Airport';
import './index.scss';

const App:React.FC = (): JSX.Element => {
  const [openAirportPanel] = useState(true);
  const code = 'MSQ';

  return (
    <>
      <StartForm />
      <FlightsMap />
      <Airport code={code} openAirportPanel={openAirportPanel} />
    </>
  );
};

export default App;
