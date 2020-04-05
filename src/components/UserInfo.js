import React, { Component } from 'react';
import { loadUser } from '../redux/actions/thunk';
import { connect } from 'react-redux';
import Loader from "react-loader-spinner";
import Playlists from "./Playlists/Playlists"

class UserInfo extends Component {

    componentDidMount() {
        this.props.loadUser();
    }

    render() {
        const { error, loading, data } = this.props.userData;
        if(error) {
            return <p>Error {error}</p>
        }
        
        if(loading) {
            return <Loader type="ThreeDots" color="#1ECD97" height={100} width={100} />
        }

        if(data) {
            return(
                <div>
                    {<p> Whaddup { data.display_name } </p>}
                    {<p> Country: { data.country } </p>}
                    <Playlists/>
                </div>
            );
        }
        return <div/>
    }
}

//State is entire state tree
function mapStateToProps(state) {
    return {
        userData: state.user
    };
}

//Map necessary dispatch functions to props
const mapDispatchToProps = {
    loadUser,
}

//Connect to redux store
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);