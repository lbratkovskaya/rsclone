import React from 'react';
import ILoginProps from './ILoginProps';

const Login = ({ login, setLoginUsername, setLoginPassword }: ILoginProps): JSX.Element => (
  <div className="start-form">
    <h1>Login</h1>
    <input type="text" placeholder="Username" onChange={(event) => setLoginUsername(event.target.value)}/>
    <input type="password" placeholder="Password" onChange={(event) => setLoginPassword(event.target.value)}/>
    <button className="btn" onClick={login}>Login</button>
  </div>
);

export default Login;
