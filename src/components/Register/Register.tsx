import React, { useState } from 'react';
import axios from 'axios';

interface IUser{
  id: string,
  username: string
}

const Register = (): JSX.Element => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [userData, setUserData] = useState<null | IUser>(null);

  const register = () => {
    axios({
      method: 'post',
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: 'auth/register',
    }).then((res) => console.log(res));
  };

  const login = () => {
    axios({
      method: 'post',
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: 'auth/login',
    }).then((res) => console.log(res));
  };

  const getCurrentUser = () => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'auth/current_user',
    }).then((res) => setUserData(res.data));
  };

  return (
  <div>
    <div>
      <h1>Register</h1>
      <input type="text" placeholder="Username" onChange={(event) => setRegisterUsername(event.target.value)}/>
      <input type="text" placeholder="Password" onChange={(event) => setRegisterPassword(event.target.value)}/>
      <button onClick={register}>Register</button>
    </div>
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="Username" onChange={(event) => setLoginUsername(event.target.value)}/>
      <input type="text" placeholder="Password" onChange={(event) => setLoginPassword(event.target.value)}/>
      <button onClick={login}>Login</button>
    </div>
    <div>
      <h1>Check user for authentication</h1>
      <button onClick={getCurrentUser}>Check</button>
      {
        userData ? <h1>Welcome, <b>{userData.username}</b></h1> : <h1>Authenticate yourself!</h1>
      }
    </div>
  </div>
  );
};

export default Register;
