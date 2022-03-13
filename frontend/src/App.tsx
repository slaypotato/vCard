import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Preference from './components/preference';
import { useState } from 'react';
import Login from './components/login';

export default function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }
  
  return (
    <div className='wrapper'>
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/preference' element={<Preference />}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}
