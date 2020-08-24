import React, { Component } from 'react';
import SignUp from './SignUp';
import Login from './Login';

class Auth extends Component {
constructor(props) {
    super(props);
    this.state = {}
    this.toHome=this.toHome.bind(this);
}

toHome() {
    this.props.history.replace({pathname: '/', state: null})
}

componentWillMount() {
    if(localStorage.getItem('token')) this.toHome();
}

render() {
    return(
        <div>
            {/* {this.toHome()} */}
        <SignUp  toHome={this.toHome}/>
        <Login toHome={this.toHome}/>
        </div>
    );
}}

export default Auth;