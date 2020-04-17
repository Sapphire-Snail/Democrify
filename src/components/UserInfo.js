import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { Container, Row, Col, Button } from "reactstrap";
import "./UserInfo.css"
class UserInfo extends Component {
  render() {
    const { error, loading, data } = this.props.userData;
    if (error) {
      return (
        <p>
          Error
          {error}
        </p>
      );
    }

    if (loading) {
      return (
        <Loader type="ThreeDots" color="#1ECD97" height={100} width={100} />
      );
    }

    if (data) {
      return (
        <Container className="userGreetingContainer" fluid={true}>
          <Container>
            <Row>
              <Col>
                <p style={{ marginBottom: 0, display:'inline' }}> Welcome, {data.display_name} ! </p>
                <Button style={{ display:'inline', paddingTop:'0'}} color="link">Log out</Button>
              </Col>
            </Row>
          </Container>
        </Container>
      );
    }
    return <div />;
  }
}

// State is entire state tree
function mapStateToProps(state) {
  return {
    userData: state.user,
  };
}
// Connect to redux store
export default connect(mapStateToProps)(UserInfo);
