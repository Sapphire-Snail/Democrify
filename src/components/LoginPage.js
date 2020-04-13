import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import './LoginPage.css';

class LoginPage extends Component {
  
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  // Called on click of login button
  async callLogin() {
    // Get auth URL from backend (this should probably all be moved to redux but hey)
    const URLres = await axios.get('/api/getLoginURL');

    // Open login popup
    window.location = URLres.data;
  }

  render() {
    // If we're already logged in, send them over to /me
    if (this.props.loggedIn) {
      return <Redirect to="/me" />;
    }
    return (
      <div className="centerContainer">
        <div style={{ display: 'block' }}>
          <button key={0} className="button button--loginApp-link" onClick={this.callLogin}>
            🔥 Login to Spotify 🔥
          </button>
        </div>
        <div className="infoContainer">
          <Button
            color="info"
            className="infoButton"
            onClick={this.toggle}
            style={{ marginBottom: '1rem' }}
          >
            What is Democrify?
          </Button>
          <Collapse isOpen={this.state.isOpen}>
            <Card>
              <CardBody>
                Democrify is your 21st century jukebox: you can create a party playlist, share it
                with your guests and let them line-up the songs that match the vibe perfectly.
                <br />
                So what are you waiting for? Let's party! 🎉
              </CardBody>
            </Card>
          </Collapse>
        </div>
      </div>
    );
  }
}

// State is entire state tree
function mapStateToProps(state) {
  return {
    loggedIn: state.user ? state.user.loggedIn : false,
  };
}
// Connect to redux store
export default connect(mapStateToProps)(LoginPage);
