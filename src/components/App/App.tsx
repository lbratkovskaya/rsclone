import React, { useState } from 'react';
import './index.scss';
import Airport from '../Airport/Airport';

const App:React.FC = (): JSX.Element => {
  const [openAirportPanel] = useState(true);
  const code = 'MSQ';

  return (
    <>
      <Airport code={code} openAirportPanel={openAirportPanel} />
    </>
  );
};

export default App;
