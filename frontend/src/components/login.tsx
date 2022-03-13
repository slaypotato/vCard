import { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials: any) {
    return fetch('http://localhost:3010/login',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => {
        return data.json();
    })
}

export default function Login({ setToken }:any) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e: any) => {
      e.preventDefault();
      const token = await loginUser({
          username,
          password
      });
      console.log('---Login: handleSubmit---')
      console.log(token.access_token);
      console.log('---Login: handleSubmit---')
      setToken({token:token.access_token});
  }

  return (
      <div className='Login-wrapper'>
          <h1>Please Log in</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange={(e: any) => setUsername(e.target.value)} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={(e: any) => setPassword(e.target.value)} />
            </label>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
  );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}