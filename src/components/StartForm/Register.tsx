import React from 'react';

interface IRegisterProps {
  register: () => void,
  setRegisterUsername: (value: string) => void,
  setRegisterPassword: (value: string) => void,
}

const Register = ({
  register,
  setRegisterUsername,
  setRegisterPassword,
}: IRegisterProps): JSX.Element => (
  <div className="start-form">
    <h1>Register</h1>
    <input type="text" placeholder="Username" onChange={(event) => setRegisterUsername(event.target.value)}/>
    <input type="text" placeholder="Password" onChange={(event) => setRegisterPassword(event.target.value)}/>
    <button className="btn" onClick={register}>Register</button>
  </div>
);

export default Register;
