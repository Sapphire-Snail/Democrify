import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { Link } from 'react-router-dom';

//Components
import LoginPage from './components/LoginPage';
import Callback from './Callback';
import UserInfo from './components/UserInfo';
import PlaylistsPage from './components/PlaylistsPage';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <img className="App-logo" src={require("./assets/logo.svg")} />
            <h2 className="slogan">Music for the people</h2>
            {/* <Link to ='/dev'>YARR</Link> */}
          </header>
          <main>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/me">
                <UserInfo/>
                <PlaylistsPage/>
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/callback">
                <Callback />
              </Route>
              <Route path="/dev">
                <p>DEV test</p>
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
