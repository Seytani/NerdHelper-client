import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TopBar from './site/TopBar';
import Auth from './Auth/Auth';
import Topics from './site/Topics';

function App() {
  const [sessionToken, setSessionToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] =useState(false);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
      setIsLoggedIn(true);
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    setIsLoggedIn(true);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
    setIsLoggedIn(false);
  };
  
  return (
    <div>
   


    <Router>
      <TopBar isLoggedIn={isLoggedIn} logout={clearToken}/>
      <Switch>
        <Route path='/topics' component={Topics}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;