import React, { Component } from "react";
import axios from "axios";
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
      userInfo : {} 
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(userInfo){
    this.setState({ 
      loggedIn: true,
      userInfo: userInfo
     });
  }

  componentDidMount() {
    //See if we already are logged in
    axios.get("/api/me")
      .then(res => {
        if(res.status === 200) {
          this.setState({ 
            loggedIn: true,
            userInfo: res.data.body
          });
          console.log("Logged in");
        }
      })
      .catch(err => {
        console.log("Not logged in");
        //console.log(err.response);
      });
  }

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

export default App;

