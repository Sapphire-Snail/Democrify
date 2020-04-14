import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';

// Components
import LoginPage from './components/LoginPage';
import Callback from './Callback';
import UserInfo from './components/UserInfo';
// import Playlists from './components/Playlists/Playlists';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1>Democrify.me</h1>
          </header>
          <main>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/me">
                <UserInfo />
                {/* <Playlists/> WILL add back once host/join page is complete */}
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/callback">
                <Callback />
              </Route>
              <Route path="*">
                <p>404 Not Found!!</p>
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
