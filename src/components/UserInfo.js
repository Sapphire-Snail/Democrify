import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from "react-loader-spinner";

class UserInfo extends Component {

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
//Connect to redux store
export default connect(mapStateToProps)(UserInfo);