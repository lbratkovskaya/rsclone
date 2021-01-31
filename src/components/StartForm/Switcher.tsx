import React from 'react';
import ISwitchProps from './ISwitchProps';
import './switcher.scss';

const Switcher = ({ isRegister, toggleIsRegister }: ISwitchProps): JSX.Element => {
  const switcherCircleClassName = isRegister ? 'switcher__circle isActive' : 'switcher__circle';

  return (
    <button
      className={`switcher ${isRegister ? 'isActive' : ''}`}
      onClick={() => toggleIsRegister(!isRegister)}
    >
      <span className={switcherCircleClassName} />
    </button>
  );
};

export default Switcher;
