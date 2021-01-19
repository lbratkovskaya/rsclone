import React, { useState } from 'react';
import './App.scss';
import Airport from '../Airport/Airport';

const App:React.FC = () => {
  const [openAirportPanel, setOpenAirportPanel] = useState(true);
  const code = 'UMMS';

  const closeAirportPanel = () => {
    setOpenAirportPanel(false);
  };

  return (
    <Airport code={code} openAirportPanel closeAirportPanel={closeAirportPanel} />
  );
};

export default App;
