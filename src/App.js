import React, { useState, useEffect } from 'react';
import TopBar from './components/site/TopBar';
import Auth from './Auth/Auth';
import Topics from './components/site/Topics';

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
  
  //protected views goes here

  return (
    <div>
      <TopBar isLoggedIn={isLoggedIn} logout={clearToken}/>
      {isLoggedIn ? <Topics token={sessionToken}/> : <Auth isLoggedIn={isLoggedIn} updateToken={updateToken}/>}

    </div>
  );
}

export default App;


//use effect to get token from local storage and set it in out state
//update token function (sets in local storage, sets state)
//clartoken funct (always habdle both sides)
//fuinction for protectedViews (ternary that shows component if user logged in/not)
//returns the navvar, with the logout button a funtion is passed as  a prop, guess which one?
//returns the component decided by the ternary in function before if user is logged in.