import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
  Container,
  Row,
  Col,
  Popover,
  //PopoverHeader,
  PopoverBody,
  //InputGroupText,
  ButtonGroup,
} from "reactstrap";
import "./WelcomeScreen.css";
import { getSession } from '../redux/actions/thunk';

class WelcomeScreen extends Component {
  constructor() {
    super();
    this.submitCode = this.submitCode.bind(this);
    this.state = {
      popoverHostOpen: false,
      popoverCodeOpen: false,
      code: '',
      isRedirect: false,
    };
  }

  togglePopover = (event) => {
    const id = event.target.id;
    if (id === "PopoverCode") {
      this.setState({
        popoverCodeOpen: !this.state.popoverCodeOpen,
      });
    } else if (id === "PopoverHost") {
      this.setState({
        popoverHostOpen: !this.state.popoverHostOpen,
      });
    }
  };

  submitCode() {
    //console.log(this.state.code);
    //this.props.getSession(this.state.code);
    this.setState({isRedirect: true});
  }

  render() {
    //Redirect user to sessions if they've entered a code
    if(this.state.isRedirect) {
      return <Redirect to={'/session/' + this.state.code}/>
    } 

    return (
      <div>
        <Container className="inputContainer">
          <Row xs="1">
            <Col>
              <InputGroup className="inputPartyCode">
                <Input placeholder="Enter the party code" onChange={(e) => this.setState({code: e.target.value})}/>
                <InputGroupAddon addonType="append">
                  <Button style={{backgroundColor: "#c030ed", borderColor : "#c030ed"}} onClick={this.submitCode}>Join!</Button>
                  <InputGroupAddon addonType="append">
                    <Button
                      style={{backgroundColor: "black", borderColor : "black"}}
                      className="informationButton"
                      id="PopoverCode"
                      type="button"
                      size="sm"
                      onClick={this.togglePopover}
                    >
                      ?
                    </Button>
                    <Popover
                      placement="bottom"
                      isOpen={this.state.popoverCodeOpen}
                      target="PopoverCode"
                    >
                      <PopoverBody>
                        You can join an existing shared playlist and start
                        adding your music to it. Just ask the host for an access
                        code!
                      </PopoverBody>
                    </Popover>
                  </InputGroupAddon>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
        </Container>
        <Container className="hostButtonContainer">
          <ButtonGroup>
            <Link to='/playlists'>
              <Button style={{backgroundColor: "#1ed760", borderColor : "#1ed760"}} size="lg">
                Host a party
              </Button>
            </Link>
            <Button
              style={{backgroundColor: "black", borderColor : "black"}}
              size="sm"
              className="informationButton"
              id="PopoverHost"
              type="button"
              onClick={this.togglePopover}
            >
              ?
            </Button>
            <Popover
              placement="bottom"
              isOpen={this.state.popoverHostOpen}
              target="PopoverHost"
              toggle={this.toggle}
            >
              <PopoverBody>
                You can start your own party! Create or share your Spotify
                playlist with your party guests
              </PopoverBody>
            </Popover>
          </ButtonGroup>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getSession
}

export default connect(null, mapDispatchToProps)(WelcomeScreen);
