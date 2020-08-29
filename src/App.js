import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import TopBar from './site/TopBar';
import Auth from './Auth/Auth';
import Topics from './site/Topics';
import ProtectedRoute from './Auth/ProtectedRoute';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: '',
      isLoggedIn: false
    }
    this.clearToken=this.clearToken.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('token')) {
      this.setState({ sessiontoken: localStorage.getItem('token') });
      this.setState({ isLoggedIn: true });
    }
  }


  clearToken() {
    localStorage.clear();
    this.setState({ sessiontoken: '' });
    this.setState({ isLoggedIn: false });
  };

  render() {
    
    return (
      <div>

        <Router>
          {/* <TopBar logout={this.clearToken} isLoggedIn={this.state.isLoggedIn}/> */}
          <Switch>
            <Redirect exact from="/" to="/topics" />
            <ProtectedRoute path='/topics' component={Topics}/>
            <Route path='/auth' component={Auth}/>
            {/* <Route path='/signup' component={SignUp}/>
            <Route path='/login' component={Login}/> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;