import React, { Component } from "react";
import { login } from './redux/actions/thunk';
import { Redirect } from 'react-router-dom';
import Loader from "react-loader-spinner";
import { connect } from 'react-redux';

//Class that's instantiated when Spotify login screen is closed
class Callback extends Component {
  
    async componentDidMount() {
      //Grab code from url then tell thunk to log us in, which also loads user data
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      this.props.login(code);
    }
  
    render() {
      if(this.props.loggedIn) {
          return <Redirect to='/me'/>
        } else {
          return <Loader type="ThreeDots" color="#1ECD97" height={100} width={100} />
      }
    }
  }
  
  //State is entire state tree
  function mapStateToProps(state) {
    return {
        loggedIn: state.user.loggedIn
    };
  }
  
  //Map necessary dispatch functions to props
  const mapDispatchToProps = {
    login,
  }
  
  //Connect to redux store
  export default connect(mapStateToProps, mapDispatchToProps)(Callback);