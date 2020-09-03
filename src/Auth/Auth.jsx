import React, { Component } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import { Grid } from 'semantic-ui-react';

class Auth extends Component {
constructor(props) {
    super(props);
    this.state = {
        login: true
    }
    this.toHome=this.toHome.bind(this);
    this.toggleAuth=this.toggleAuth.bind(this);
}

toggleAuth() {
    this.setState({login: !this.state.login})
} 

toHome() {
    this.props.history.replace({pathname: '/', state: null})
}

componentWillMount() {
    if(localStorage.getItem('token')) this.toHome();
}

render() {
    return(
        
        <div className='authLanding' style={{display: 'flex', juustifyContent: 'center', alignItems: 'center'}}>
        <div className='authImage'>
            <div id='brand'></div>
            <div id='landingText'>
            <h1 className='landingHeader'>Hey there,</h1>
            <h1 className='landingHeader'>ready to </h1>
            <h1 className='landingHeader'>nerd out?</h1>
            <h3 className='landingSub'>Sign Up or Login to start studying</h3>
            </div>
        </div>
        {this.state.login ? <Login toHome={this.toHome} toggleAuth={this.toggleAuth}/> : <SignUp toHome={this.toHome} toggleAuth={this.toggleAuth}/>}
        </div>
        
    );
}}

export default Auth;