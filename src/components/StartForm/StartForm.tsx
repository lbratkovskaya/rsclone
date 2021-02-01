import React, { useState } from 'react';
import axios from 'axios';
import Register from './Register';
import Login from './Login';
import Switcher from './Switcher';
import { StartFormProps } from '../../types/StartFormType';
import './start-form.scss';

const StartForm = (props: StartFormProps): JSX.Element => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isRegister, toggleIsRegister] = useState(false);
  const onLoginRedirectHandler = (): void => {
    props.history.push('/');
    props.getCurrentUser();
  }
  const register = () => {
    axios({
      method: 'post',
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: 'auth/register',
    }).then((res) => {
      onLoginRedirectHandler();
    });
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
    }).then((res) => {
      onLoginRedirectHandler();
    });
  };
  return (
    <div className="start-form-container">
      <Switcher
        isRegister={isRegister}
        toggleIsRegister={toggleIsRegister}
      />
      {isRegister
        ? (
          <Register
            setRegisterUsername={setRegisterUsername}
            setRegisterPassword={setRegisterPassword}
            register={register}
          />
        )
        : (
          <Login
            setLoginUsername={setLoginUsername}
            setLoginPassword={setLoginPassword}
            login={login}
          />
        )}
      <button type="button" className="btn" id="checkUser" onClick={props.getCurrentUser}>Check user authorization</button>
    </div>
  );
};

export default StartForm;
