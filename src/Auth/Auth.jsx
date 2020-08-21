import React, { Component } from 'react';
import SignUp from './SignUp';
import Login from './Login';

class Auth extends Component {
constructor(props) {
    super(props);

}
render() {
    return(
        <div>
        <SignUp  />
        <Login  />
        </div>
    );
}}

export default Auth;