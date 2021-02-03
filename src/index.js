import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

render((
  <BrowserRouter basename="/rsclone/clone">
    <App />
  </BrowserRouter>
), document.getElementById('root'));
