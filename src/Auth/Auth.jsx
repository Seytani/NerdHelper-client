import React from 'react';
import SignUp from './SignUp';
import Login from './Login';

const Auth = (props) => {

    return(
        <div>
        <SignUp updateToken={props.updateToken} />
        <Login updateToken={props.updateToken} />
        </div>
    );
}

export default Auth;