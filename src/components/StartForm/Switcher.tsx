import React from 'react';
import './switcher.scss';

interface ISwitchProps {
  isRegister: boolean,
  toggleIsRegister: (currentFormState: boolean) => void
};

const Switcher = ({ isRegister, toggleIsRegister }: ISwitchProps): JSX.Element => {
  return (
    <button
      className={`switcher ${isRegister ? 'isActive' : ''}`}
      onClick={() => toggleIsRegister(!isRegister)}
    >
      <span className={`switcher__circle ${isRegister ? 'isActive' : ''}` }></span>
    </button>
  );
};

export default Switcher;
