import React from 'react';

interface ILoginProps {
  login: () => void,
  setLoginUsername: (value: string) => void,
  setLoginPassword: (value: string) => void,
}

const Login = ({ login, setLoginUsername, setLoginPassword }: ILoginProps): JSX.Element => (
  <div className="start-form">
    <h1>Login</h1>
    <input type="text" placeholder="Username" onChange={(event) => setLoginUsername(event.target.value)}/>
    <input type="password" placeholder="Password" onChange={(event) => setLoginPassword(event.target.value)}/>
    <button className="btn" onClick={login}>Login</button>
  </div>
);

export default Login;
