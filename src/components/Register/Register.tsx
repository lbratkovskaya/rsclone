import React, { useState } from 'react';
import axios from 'axios';

const Register = (): JSX.Element => {
  const [registerUsername, setUsername] = useState('');
  const [registerPassword, setPassword] = useState('');
  const register = () => {
    axios({
      method: 'post',
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: 'http://localhost:3000/auth/register',
    }).then((res) => console.log(res));
  };
  return (
  <div>
    <h1>Register</h1>
    <input type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>
    <input type="text" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
    <button onClick={register}>Submit</button>
  </div>
  );
};

export default Register;
