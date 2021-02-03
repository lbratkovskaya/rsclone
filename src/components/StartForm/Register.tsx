import React from 'react';
import IRegisterProps from './IRegisterProps';

const Register = ({
  register,
  setRegisterUsername,
  setRegisterPassword,
}: IRegisterProps): JSX.Element => (
  <div className="start-form">
    <h1>Register</h1>
    <input type="text" placeholder="Username" onChange={(event) => setRegisterUsername(event.target.value)} />
    <input type="text" placeholder="Password" onChange={(event) => setRegisterPassword(event.target.value)} />
    <button className="btn" onClick={register}>Register</button>
  </div>
);

export default Register;
