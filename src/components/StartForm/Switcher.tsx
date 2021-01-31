import React from 'react';
import ISwitchProps from './ISwitchProps';
import './switcher.scss';

const Switcher = ({ isRegister, toggleIsRegister }: ISwitchProps): JSX.Element => (
    <button
      className={`switcher ${isRegister ? 'isActive' : ''}`}
      onClick={() => toggleIsRegister(!isRegister)}
    >
      <span className={`switcher__circle ${isRegister ? 'isActive' : ''}` }></span>
    </button>
);

export default Switcher;
