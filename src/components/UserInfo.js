import React, { Component } from 'react';
import { loadUser } from '../redux/actions/thunk';
import { connect } from 'react-redux';

class UserInfo extends Component {

    componentDidMount() {
        this.props.loadUser();
    }

    render() {
        const { error, loading, data } = this.props.userData;
        if(error) {
            return <p>Error {error.message}</p>
        }
        
        if(loading) {
            return <p>Loading info...</p>
        }

        if(data) {
            return(
                <div>
                    {<p> Hello { data.display_name } </p>}
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

const mapDispatchToProps = {
    loadUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);