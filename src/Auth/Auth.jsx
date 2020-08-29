import React, { Component } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import { Grid, Image } from 'semantic-ui-react';

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
        <Grid colums={2} centered>
        <div className='authLanding' style={{display: 'flex'}}>
        <div className='authImage'>
            <div id='brand'></div>
            <div id='landingText'>
            <h1 className='landingHeader'>Hey there,</h1>
            <h1 className='landingHeader'>Ready to </h1>
            <h1 className='landingHeader'>Nerd out?</h1>
            <h3 className='landingSub'>Sign Up or Login to start studying</h3>
            </div>
        </div>
        <Grid.Column>
        {this.state.login ? <Login toHome={this.toHome} toggleAuth={this.toggleAuth}/> : <SignUp toHome={this.toHome} toggleAuth={this.toggleAuth}/>}
        </Grid.Column>
        </div>
        </Grid>
    );
}}

export default Auth;