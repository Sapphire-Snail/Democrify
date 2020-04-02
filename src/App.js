import React, { Component } from "react";
import "./App.css";

//Components
import UserInfo from './components/UserInfo';
import Login from './components/Login';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userInfo : {} };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(userInfo){
    this.setState({ userInfo: userInfo });
  }

  componentDidMount() {}

  render() {
    return (
         <div className="App">
          <header>
            <h1>Democrify.me</h1>
            {<Login userInfo = {this.state.userInfo} handleLogin = {this.handleLogin}></Login>}
            {<UserInfo userInfo = {this.state.userInfo}></UserInfo>}   
          </header>
        </div>
    );
  }
}

export default App;

