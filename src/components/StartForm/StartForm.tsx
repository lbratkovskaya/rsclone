import React, { useState } from 'react';
import axios from 'axios';
import Register from './Register';
import Login from './Login';
import Switcher from './Switcher';
import './start-form.scss';

interface IUser{
  id: string,
  username: string,
  lastSessionEndedDate?: Date,
  favorites?: [
    {
      addedToFavorites: Date,
      codeName: string,
      arrivalAirport: {
        name: string,
        code: string,
        position: {
          latitude: string,
          longitude: string
        }
      },
      departureAirport: {
        name: string,
        code: string,
        position: {
          latitude: string,
          longitude: string
        }
      },
    },
  ]
}

const StartForm = (): JSX.Element => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [userData, setUserData] = useState<null | IUser>(null);
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

  const getCurrentUser = () => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'auth/current_user',
    }).then((res) => {
      console.log(res.data);
      setUserData(res.data);
    });
  };

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
