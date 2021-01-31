import React, { useState } from 'react';
import './index.scss';
import Flight from '../Flight/Flight';

const App:React.FC = (): JSX.Element => {
  const [openFlightPanel] = useState(true);
  const hexCode = '26b3c1e2';

  return (
    <>
      <Flight hexCode={hexCode} openFlightPanel={openFlightPanel} />
    </>
  );
};

export default App;
