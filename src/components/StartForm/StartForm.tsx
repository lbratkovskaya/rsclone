import React, { useState } from 'react';
import axios from 'axios';
import Register from './Register';
import Login from './Login';
import Switcher from './Switcher';
import './start-form.scss';
import { IUser } from '../../types';

const StartForm = (props: {getCurrentUser: () => IUser}): JSX.Element => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isRegister, toggleIsRegister] = useState(false);

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

  const { getCurrentUser } = props;
  return (
    <div className='start-form-container'>
      <Switcher
        isRegister={isRegister}
        toggleIsRegister={toggleIsRegister}
      />
      {isRegister
        ? <Register
          setRegisterUsername={setRegisterUsername}
          setRegisterPassword={setRegisterPassword}
          register={register}
        />
        : <Login
          setLoginUsername={setLoginUsername}
          setLoginPassword={setLoginPassword}
          login={login}
        />
      }
      <button className='btn' id='checkUser' onClick={getCurrentUser}>Check user authorization</button>
    </div>
  );
};

export default StartForm;
