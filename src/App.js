import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import TopBar from './site/TopBar';
import Auth from './Auth/Auth';
import Topics from './site/Topics';
import ManageQuestions from './components/ManageQuestions'
import ProtectedRoute from './Auth/ProtectedRoute';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: '',
      isLoggedIn: false
    }
    this.updateToken=this.updateToken.bind(this);
    this.clearToken=this.clearToken.bind(this);
    // this.toAuth=this.toAuth.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('token')) {
      this.setState({ sessiontoken: localStorage.getItem('token') });
      this.setState({ isLoggedIn: true });
    }
  }

  updateToken(newToken) {
    localStorage.setItem('token', newToken);
    this.setState({ sessiontoken: newToken });
    this.setState({ isLoggedIn: true });
  };

  clearToken() {
    localStorage.clear();
    this.setState({ sessiontoken: '' });
    this.setState({ isLoggedIn: false });
  };

//   toAuth() {
//     this.props.history.push({
//         pathname: `${this.props.match.path}/auth`,
//         isLoggedIn: this.isLoggedIn,
//         updateToken: this.updateToken
//     });
//     return (<Auth/>)
// }

  render() {
    
    return (
      <div>
      {/* {this.isLoggedIn ? this.props.history.push({pathname: '/auth'}) : this.props.history.push({pathname: '/topics'})} */}



        <Router>
          <TopBar isLoggedIn={this.state.isLoggedIn} logout={this.clearToken} />
          <Switch>
            <Redirect exact from="/" to="/topics" />
            <ProtectedRoute path='/topics' component={Topics} />
            <Route path='/auth' component={Auth} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;