import React, { useState } from 'react';
import FlightsMap from '../FlightsMap';
import Airport from '../Airport/Airport';
import './index.scss';

const App:React.FC = (): JSX.Element => {
  const [openAirportPanel] = useState(true);
  const code = 'MSQ';

  return (
    <>
      <FlightsMap />
      <Airport code={code} openAirportPanel={openAirportPanel} />
    </>
  );
};

export default App;
