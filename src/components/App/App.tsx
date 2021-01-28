import React, { useState } from 'react';
import './index.scss';
import Airport from '../Airport/Airport';
import Flight from '../Flight/Flight';

const App:React.FC = (): JSX.Element => {
  const [openAirportPanel] = useState(false);
  const [openFlightPanel] = useState(true);
  const code = 'MSQ';
  const hexCode = '26ae5afd';

  return (
    <>
      <Airport code={code} openAirportPanel={openAirportPanel} />
      <Flight hexCode={hexCode} openFlightPanel={openFlightPanel} />
    </>
  );
};

export default App;
