import React, { Component } from "react";
import { connect } from 'react-redux';
import { loadPlaylists } from './redux/actions/thunk';
import "./App.css";

//Components
import UserInfo from './components/UserInfo';
import Login from './components/Login';
import Playlists from './components/Playlists/Playlists';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loggedIn : false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(userInfo){
    this.setState({ 
      loggedIn: true,
      userInfo: userInfo
     });
     //Load user playlists
     this.props.loadPlaylists();
  }

  componentDidMount() {}

  render() {
    return (
         <div className="App">
          <header>
            <h1>Democrify.me</h1>
            {this.state.loggedIn
              ? 
              [ 
              <UserInfo key={0} userInfo = {this.state.userInfo}></UserInfo>,
              <Playlists key={1} userId = {this.state.userInfo.id}/>
              ]
              : <Login userInfo = {this.state.userInfo} handleLogin = {this.handleLogin}></Login>
            }   
          </header>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {state};
}

const mapDispatchToProps = {
  loadPlaylists
}

// Applies the config using the "connect" higher-order component provided by Redux
export default connect(mapStateToProps, mapDispatchToProps)(App);
// -------------------------------------------------------------
