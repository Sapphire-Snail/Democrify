import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Api from './api';
import "./App.css";

//Components
import LoginPage from "./components/LoginPage";
import UserInfo from './components/UserInfo';
//import Playlists from "./components/Playlists/Playlists";

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
                <LoginPage/>
              </Route>
              <Route path="/me">
                <UserInfo/>
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/callback">
                <Callback/>
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

function mapStateToProps(state) {
  return {state};
}

// Applies the config using the "connect" higher-order component provided by Redux
export default connect(mapStateToProps)(App);
// -------------------------------------------------------------

//Define callback object to retrieve code from URL and tell server to create access tokens
const Callback = () => {
  //Retrieve auth code from URL
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  if (code){
    //If code exists, get user access tokens
    Api.getUserTokens(code);
    return <Redirect to='/me'/>
  }
 return <Redirect to='/login'/>
 }