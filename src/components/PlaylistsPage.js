import React, { Component } from "react";
import { loadPlaylists, createPlaylist } from "../redux/actions/thunk";
import { connect } from "react-redux";
import Playlists from "./Playlists/Playlists";
import { Link } from "react-router-dom";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import Notifications, {notify} from 'react-notify-toast';
import "./PopUP.css";
class PlaylistsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listname: '',
      seen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadPlaylists();
  }

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };

  handleChange(event) {
    this.setState({ listname: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.listname == '') {
      notify.show('Enter playlist name', 'error');  
    } else {
      this.setState({seen: false, listname: ''});
      this.props.createPlaylist(this.props.userId, this.state.listname);
      notify.show('Successfully created playlist', 'success');
      console.log('here');
    }
  }

  render() {
    return (
      <div>
        <Link to="/me">Back we go bois</Link>

        <Playlists title="Top playlists" col1Name="Name" col2Name="Songs" />
        <div>
          <Collapse isOpen={!this.state.seen}>
            <button
              className="button button--loginApp-link"
              onClick={this.togglePop}
            >
              Create Playlist
            </button>
          </Collapse>
        </div>
        <Collapse isOpen={this.state.seen}>
          <Card className={"card"}>
            <CardBody>
              <form onSubmit={this.handleSubmit}>
                Playlist name
                <br />
                <label>
                  <input
                    type="text"
                    value={this.state.listname}
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <input type="submit" value="Submit" />
              </form>
              <button onClick={this.togglePop}>Close</button>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

//State is entire state tree
function mapStateToProps(state) {
  return {
    userId: state.user.data ? state.user.data.id : false,
  };
}

const mapDispatchToProps = {
  loadPlaylists,
  createPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsPage);
