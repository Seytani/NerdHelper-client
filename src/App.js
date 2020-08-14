import React, { useState } from 'react';
import TopBar from './components/site/TopBar';
import SignUp from './Auth/SignUp';

function App() {
  const [sessionToken, setSessionToken] = useState('');

  

  return (
    <div>
      <TopBar/>
      <SignUp/>
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