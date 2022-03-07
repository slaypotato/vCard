import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Preference from './components/preference';


export default function App() {
  const [token, setToken] = useState();

  if(!token) {
    console.log('---App---')
    console.log(token)
    console.log('---App---')
    return <Login setToken={setToken} />
  }
  return (
    <div className='wrapper'>
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='preference' element={<Preference />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
