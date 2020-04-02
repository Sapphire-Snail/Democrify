import React, { Component } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

//Components
import UserInfo from './components/UserInfo';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userInfo : {} };
    this.callLogin = this.callLogin.bind(this);
  }

  //Called on click of login button
  async callLogin() {
    //Get auth URL from backend
    var URLres = await Promise.all([axios.get("/api/getLoginURL")]);

    //Open login popup
    var popup = window.open(
      URLres[0].data,
      'Login with Spotify',
      'width=800,height=900'
    )

    //Create callback function to be called when user clicks login
    window.spotifyCallback = async (payload) => { 
      //Close popup and tell server to log in
      popup.close();

      await Promise.all([
        axios({
          method: "post",
          url: "/api/login",
          timeout: 50000,
          data: {
            code: payload
          }
        })]);
      const response = await axios.get("/api/me");
      console.log(response.data.body);
      this.setState({userInfo : response.data.body});
    }
  }

  componentDidMount() {
    //Retrieve auth code from URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    //If code exists i.e if this component is within the popup, call the previous callback function to close popup
    if (code) {
      window.opener.spotifyCallback(code);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          Democrify up in this bitch.
          </p>
          
          <button
            className="btn btn--loginApp-link"
            onClick={this.callLogin}
          >
            Login to Spotify
          </button>

          {<UserInfo userInfo = {this.state.userInfo}></UserInfo>}
        </header>
      </div>
    );
  }
}

export default App;

